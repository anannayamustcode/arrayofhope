from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from langchain_community.llms import Ollama
import requests
from bs4 import BeautifulSoup
import ollama
from PIL import Image
import io
import base64

app = Flask(__name__)

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'txt'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Store conversation chains for different sessions
conversation_chains = {}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_pdf_text(pdf_path):
    text = ""
    with open(pdf_path, 'rb') as file:
        pdf_reader = PdfReader(file)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text

def get_text_file_content(text_path):
    with open(text_path, 'r') as file:
        return file.read()

def get_url_text(urls):
    text = ""
    for url in urls:
        try:
            response = requests.get(url)
            soup = BeautifulSoup(response.text, 'html.parser')
            for script in soup(["script", "style"]):
                script.decompose()
            text += soup.get_text(separator='\n', strip=True) + "\n"
        except Exception as e:
            return {"error": f"Error processing URL {url}: {str(e)}"}, 400
    return text

def get_text_chunks(text):
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    return text_splitter.split_text(text)

def get_vectorstore(text_chunks):
    embeddings = HuggingFaceEmbeddings(model_name="hkunlp/instructor-xl")
    vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
    return vectorstore

def get_conversation_chain(vectorstore):
    llm = Ollama(model="llama2", temperature=0.3)
    memory = ConversationBufferMemory(memory_key='chat_history', return_messages=True)
    conversation_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vectorstore.as_retriever(),
        memory=memory
    )
    return conversation_chain

def classify_requirements(text):
    llm = Ollama(model="llama2", temperature=0.3)
    prompt = f"""Analyze the following text and classify the requirements into Functional and Non-Functional Requirements. 
    Each category should have at least 3 detailed points. Format the output clearly:
    
    Text: {text}
    """
    response = llm(prompt)
    return response

@app.route('/upload', methods=['POST'])
def upload_files():
    if 'files' not in request.files and 'urls' not in request.form:
        return jsonify({"error": "No files or URLs provided"}), 400
    
    session_id = request.headers.get('Session-ID')
    if not session_id:
        return jsonify({"error": "Session-ID header is required"}), 400
    
    combined_text = ""
    
    # Process uploaded files
    if 'files' in request.files:
        files = request.files.getlist('files')
        for file in files:
            if file:
                filename = secure_filename(file.filename)
                # Check if it's an image file
                if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                    try:
                        # Process image using OCR functionality
                        image = Image.open(file)
                        image_bytes = io.BytesIO()
                        image.save(image_bytes, format=image.format)
                        image_data = image_bytes.getvalue()
                        
                        # Process with Gemma
                        response = ollama.chat(
                            model='gemma3:12b',
                            messages=[{
                                'role': 'user',
                                'content': """Analyze the text in the provided image. Extract all readable content
                                            and present it in a structured Markdown format that is clear, concise, 
                                            and well-organized. Ensure proper formatting (e.g., headings, lists, or
                                            code blocks) as necessary to represent the content effectively.""",
                                'images': [image_data]
                            }]
                        )
                        combined_text += response['message']['content'] + "\n"
                    except Exception as e:
                        return jsonify({"error": f"Error processing image: {str(e)}"}), 500
                
                # Handle PDF and TXT files
                elif filename.endswith('.pdf') or filename.endswith('.txt'):
                    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                    file.save(filepath)
                    
                    if filename.endswith('.pdf'):
                        combined_text += get_pdf_text(filepath)
                    else:
                        combined_text += get_text_file_content(filepath)
                    
                    os.remove(filepath)
                else:
                    return jsonify({"error": f"Unsupported file type for {filename}"}), 400
    
    # Process URLs
    if 'urls' in request.form:
        urls = request.form.getlist('urls')
        url_text = get_url_text(urls)
        if isinstance(url_text, tuple):  # Error occurred
            return url_text
        combined_text += url_text
    
    if not combined_text.strip():
        return jsonify({"error": "No valid content found"}), 400
    
    # Create text chunks and vector store
    text_chunks = get_text_chunks(combined_text)
    vectorstore = get_vectorstore(text_chunks)
    conversation_chain = get_conversation_chain(vectorstore)
    
    # Store conversation chain for this session
    conversation_chains[session_id] = {
        'chain': conversation_chain,
        'text': combined_text
    }
    
    return jsonify({
        "message": "Documents processed successfully",
        "session_id": session_id
    }), 200

@app.route('/chat', methods=['POST'])
def chat():
    session_id = request.headers.get('Session-ID')
    if not session_id or session_id not in conversation_chains:
        return jsonify({"error": "Invalid or missing Session-ID"}), 400
    
    if not request.json or 'question' not in request.json:
        return jsonify({"error": "No question provided"}), 400
    
    question = request.json['question']
    conversation_chain = conversation_chains[session_id]['chain']
    
    try:
        response = conversation_chain({'question': question})
        # Convert chat history messages to a serializable format
        chat_history = []
        for msg in response['chat_history']:
            chat_history.append({
                'type': msg.type,
                'content': msg.content
            })
        
        return jsonify({
            "answer": response['answer'],
            "chat_history": chat_history
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/classify', methods=['POST'])
def classify_docs():
    session_id = request.headers.get('Session-ID')
    if not session_id or session_id not in conversation_chains:
        return jsonify({"error": "Invalid or missing Session-ID"}), 400
    
    text = conversation_chains[session_id]['text']
    classification = classify_requirements(text)
    
    return jsonify({
        "classification": classification
    })

@app.route('/update-requirements', methods=['POST'])
def update_reqs():
    if not request.json or 'current_classification' not in request.json or 'changes' not in request.json:
        return jsonify({"error": "Missing required fields"}), 400
    
    current = request.json['current_classification']
    changes = request.json['changes']
    
    llm = Ollama(model="llama2", temperature=0.3)
    prompt = f"""Given the current classification of requirements:
    {current}
    
    Apply ONLY these specific changes:
    {changes}
    
    Important:
    1. ONLY modify the requirements mentioned in the changes
    2. DO NOT add any new requirements
    3. Keep all other existing requirements exactly as they are
    4. If a change refers to a non-existent requirement, ignore it
    
    Return the complete classification with ONLY the specified changes applied."""
    
    updated_classification = llm(prompt)
    
    return jsonify({
        "updated_classification": updated_classification
    })

@app.route('/ocr', methods=['POST'])
def process_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    
    image_file = request.files['image']
    if not image_file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        return jsonify({"error": "Invalid image format. Please upload PNG or JPEG"}), 400
    
    try:
        # Read and process the image
        image = Image.open(image_file)
        image_bytes = io.BytesIO()
        image.save(image_bytes, format=image.format)
        image_data = image_bytes.getvalue()
        
        # Process with Gemma
        response = ollama.chat(
            model='gemma3:12b',
            messages=[{
                'role': 'user',
                'content': """Analyze the text in the provided image. Extract all readable content
                            and present it in a structured Markdown format that is clear, concise, 
                            and well-organized. Ensure proper formatting (e.g., headings, lists, or
                            code blocks) as necessary to represent the content effectively.""",
                'images': [image_data]
            }]
        )
        
        return jsonify({
            "success": True,
            "text": response.message.content
        })
        
    except Exception as e:
        return jsonify({"error": f"Error processing image: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)


#ngrok http 10000
#python flask_api_llama2.py
#ollama serve