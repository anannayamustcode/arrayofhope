import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate } from "react-router-dom";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import ChatPopup from "../src/components/ChatPopup";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function FileUploader() {
  const [files, setFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [urlInput, setUrlInput] = useState("");

  // Handle file uploads
  const handleFileUpload = async (e) => {
    const uploadedFiles = Array.from(e.target.files);
    let newFiles = [...files];
    setError("");

    const formData = new FormData();
    uploadedFiles.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        setError(`"${file.name}" exceeds the 5MB limit.`);
      } else if (!newFiles.some((f) => f.name === file.name)) {
        const fileType = file.name.split(".").pop().toLowerCase();
        newFiles.push({
          name: file.name,
          type: fileType,
          url: URL.createObjectURL(file),
        });

        // Append to form data for backend upload
        formData.append("file", file);
      }
    });

    setFiles(newFiles);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Upload failed.");
      }

      console.log("Upload success:", result);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to upload file to server.");
    }
  };
  const handleUrlUpload = async () => {
    if (!urlInput.trim()) {
      setError("Please enter a valid URL.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/upload-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: urlInput }),
      });
  
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to fetch site.");
  
      const newUrlFile = {
        name: result.title || urlInput,
        type: "url",
        url: result.url,
      };
  
      setFiles((prev) => [...prev, newUrlFile]);
      setUrlInput(""); // reset input
      setError("");
      console.log("URL upload success:", result);
    } catch (err) {
      console.error("Error uploading URL:", err);
      setError("Failed to fetch website content.");
    }
  };
  
  // Remove file and clean up memory
  const removeFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    if (previewFile?.name === fileName) setPreviewFile(null);
  };

  // Handle preview selection
  const handlePreview = (file) => {
    setPreviewFile(file);
    if (file.type === "pdf") {
      setIsLoading(true);
      setPageNumber(1);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  };

  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber((prev) => Math.min(prev + 1, numPages));
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));

  // Cleanup object URLs when files are removed
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.url));
    };
  }, [files]);

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg relative">
      <h1 className="text-2xl font-bold text-[#012169] mb-4">Upload Files</h1>

      {/* File Upload Input */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          multiple
          className="hidden"
          id="file-upload"
          onChange={handleFileUpload}
          accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-[#012169] text-white px-6 py-3 rounded-md inline-block hover:bg-[#0038a8]"
        >
          Select Files
        </label>
        <p className="mt-2 text-gray-500">Upload PDF, images, or documents (Max 5MB each)</p>
      </div>
      {/* URL Upload Input */}
      <div className="mt-4 text-center text-black">
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Enter website URL"
          className="border border-gray-300 px-4 py-2 rounded-md w-5/6"
        />
        <button
          onClick={handleUrlUpload}
          className="ml-2 !bg-[#012169] text-white px-4 py-2 rounded-md hover:bg-[#0038a8]"
        >
          Add URL
        </button>
      </div>


      {/* Error Message */}
      {error && <div className="mt-4 p-3 bg-red-50 text-red-800 rounded">{error}</div>}

      {/* File List */}
      <div className="mt-4 border border-gray-200 rounded-lg p-4">
        {files.length === 0 ? (
          <p className="text-gray-500 text-center">No files uploaded yet.</p>
        ) : (
          <ul className="space-y-2">
            {files.map((file) => (
              <li
                key={file.name}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-md cursor-pointer hover:bg-gray-200"
                onClick={() => handlePreview(file)}
              >
                <span className="text-black font-medium">{file.name}</span>
                <div className="flex space-x-3">
                  <a
                    href={file.url}
                    download={file.name}
                    className="mt-3"
                  >
                    <img src="/public/download.svg" alt="Download" className="w-5 h-5" />
                  </a>
                  <button
                    className="!bg-gray-100 text-red-600 hover:text-red-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.name);
                    }}
                  >
                    ✖
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Review Button */}
      <div className="mt-6 flex justify-center">
        <button className="!bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition" onClick={() => navigate("/review")}>
          Review
        </button>
      </div>

      {/* Chat Popup Button */}
      <ChatPopup/>
    </div>
  );
}