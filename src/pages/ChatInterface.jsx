import { useState } from "react";

export default function ChatInterface() {
  const [question, setQuestion] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const sessionId = "abc123"; // Maintain session continuity

  const sendMessage = async () => {
    if (!question.trim()) return;

    const userMsg = { sender: "You", text: question };
    setChatLog((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Session-ID": sessionId,
        },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();

      const aiMsg = { sender: "AI", text: data.answer };
      setChatLog((prev) => [...prev, aiMsg]);
      setQuestion("");
    } catch (err) {
      console.error("Chat error:", err);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white p-4 shadow-xl rounded">
      <h3 className="font-bold text-blue-600 mb-2">Ask AI</h3>
      <div className="max-h-64 overflow-y-auto mb-2">
        {chatLog.map((msg, i) => (
          <div key={i} className="mb-2">
            <strong>{msg.sender}:</strong> <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="border p-1 w-full mb-1"
        placeholder="Ask something..."
      />
      <button onClick={sendMessage} className="bg-blue-600 text-white w-full py-1 rounded">
        Send
      </button>
    </div>
  );
}
//           onClick={handleCompleteNegotiation}    
//           >
//           Complete Negotiation
//         </button>
//         </div>               

//         <input
//           type="text"                    
//           placeholder={`Respond as ${roles[activeRole].name}...`}    
//           className="flex-1 p-2 border rounded-lg"   
//           value={input}  
//           onChange={(e) => setInput(e.target.value)} 

//           onKeyDown={(e) => e.key === "Enter" && handleResponse()}   
//         />

//         <button  
//           className="!bg-[#012169] text-white px-4 py-2 rounded-lg hover:bg-[#011a4b] transition"
//           onClick={handleResponse}
//         >
//           Send
//         </button>

//       </div> 
//       <div className="mt-6 flex justify-end">
//         <button  
//           className="!bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
//           onClick={handleFinishNegotiation}  
//         >            
//           Complete Negotiation   
//         </button>    
//       </div> 
//       <div className="mt-6 flex justify-end">    

//         <div className="flex space-x-4"> 
//       </div>             