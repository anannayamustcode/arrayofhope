// import { useState, useRef, useEffect } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import { useNavigate } from "react-router-dom";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";
// import ChatPopup from "../src/components/ChatPopup";

// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// export default function FileUploader() {
//   const [files, setFiles] = useState([]);
//   const [previewFile, setPreviewFile] = useState(null);
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [scale, setScale] = useState(1.0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const containerRef = useRef(null);
//   const [urlInput, setUrlInput] = useState("");

//   // Handle file uploads
//   // const handleFileUpload = async (e) => {
//   //   const uploadedFiles = Array.from(e.target.files);
//   //   let newFiles = [...files];
//   //   setError("");

//   //   const formData = new FormData();
//   //   uploadedFiles.forEach((file) => {
//   //     if (file.size > 5 * 1024 * 1024) {
//   //       setError(`"${file.name}" exceeds the 5MB limit.`);
//   //     } else if (!newFiles.some((f) => f.name === file.name)) {
//   //       const fileType = file.name.split(".").pop().toLowerCase();
//   //       newFiles.push({
//   //         name: file.name,
//   //         type: fileType,
//   //         url: URL.createObjectURL(file),
//   //       });

//   //       // Append to form data for backend upload
//   //       formData.append("file", file);
//   //     }
//   //   });

//   //   setFiles(newFiles);

//   //   try {
//   //     const response = await fetch("http://localhost:5000/upload", {
//   //       method: "POST",
//   //       body: formData,
//   //     });

//   //     const result = await response.json();
//   //     if (!response.ok) {
//   //       throw new Error(result.message || "Upload failed.");
//   //     }

//   //     console.log("Upload success:", result);
//   //   } catch (error) {
//   //     console.error("Error uploading file:", error);
//   //     setError("Failed to upload file to server.");
//   //   }
//   // };

// const handleFileUpload = async (e) => {
//   const uploadedFiles = Array.from(e.target.files);
//   let newFiles = [...files];
//   setError("");

//   const formData = new FormData();
//   let validFileAdded = false;

//   uploadedFiles.forEach((file) => {
//     if (file.size > 5 * 1024 * 1024) {
//       setError(`"${file.name}" exceeds the 5MB limit.`);
//     } else if (!newFiles.some((f) => f.name === file.name)) {
//       const fileType = file.name.split(".").pop().toLowerCase();
//       newFiles.push({
//         name: file.name,
//         type: fileType,
//         url: URL.createObjectURL(file),
//       });

//       formData.append("file", file);
//       // formData.append("files", file); // ✅ correct field name for Flask
//       validFileAdded = true;
//     }
//   });

//   setFiles(newFiles);

//   if (!validFileAdded) return;

//   try {
//       const response = await fetch("https://b9ce-2405-201-1015-3898-2873-2289-3f2f-ed02.ngrok-free.app/upload", {
//       method: "POST",
//       body: formData,
//       headers: {
//         "Session-ID": "abc123", // ✅ Add session header if chat needed
//       },
//     });

//     const result = await response.json();
//     if (!response.ok) {
//       throw new Error(result.message || "Upload failed.");
//     }

//     console.log("Upload success:", result);
//     // Optionally show `result.prediction` or `result.result` somewhere in the UI
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     setError("Failed to upload file to server.");
//   }
// };


//   // const handleUrlUpload = async () => {
//   //   if (!urlInput.trim()) {
//   //     setError("Please enter a valid URL.");
//   //     return;
//   //   }
  
//   //   try {
//   //     const response = await fetch("http://localhost:5000/upload-url", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({ url: urlInput }),
//   //     });
  
//   //     const result = await response.json();
//   //     if (!response.ok) throw new Error(result.message || "Failed to fetch site.");
  
//   //     const newUrlFile = {
//   //       name: result.title || urlInput,
//   //       type: "url",
//   //       url: result.url,
//   //     };
  
//   //     setFiles((prev) => [...prev, newUrlFile]);
//   //     setUrlInput(""); // reset input
//   //     setError("");
//   //     console.log("URL upload success:", result);
//   //   } catch (err) {
//   //     console.error("Error uploading URL:", err);
//   //     setError("Failed to fetch website content.");
//   //   }
//   // };

  

//   const handleUrlUpload = async () => {
//   if (!urlInput.trim()) {
//     setError("Please enter a valid URL.");
//     return;
//   }

//   try {
//     const response = await fetch("http://localhost:5000/upload-url", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Session-ID": "abc123", // ✅ again, keep consistent
//       },
//       body: JSON.stringify({ url: urlInput }),
//     });

//     const result = await response.json();
//     if (!response.ok) throw new Error(result.message || "Failed to fetch site.");

//     const newUrlFile = {
//       name: result.title || urlInput,
//       type: "url",
//       url: result.url || urlInput,
//     };

//     setFiles((prev) => [...prev, newUrlFile]);
//     setUrlInput("");
//     setError("");
//     console.log("URL upload success:", result);
//   } catch (err) {
//     console.error("Error uploading URL:", err);
//     setError("Failed to fetch website content.");
//   }
// };

//   // Remove file and clean up memory
//   const removeFile = (fileName) => {
//     setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
//     if (previewFile?.name === fileName) setPreviewFile(null);
//   };

//   // Handle preview selection
//   const handlePreview = (file) => {
//     setPreviewFile(file);
//     if (file.type === "pdf") {
//       setIsLoading(true);
//       setPageNumber(1);
//     }
//   };

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//     setIsLoading(false);
//     setError(null);
//   };

//   const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
//   const goToNextPage = () => setPageNumber((prev) => Math.min(prev + 1, numPages));
//   const zoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3.0));
//   const zoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));

//   // Cleanup object URLs when files are removed
//   useEffect(() => {
//     return () => {
//       files.forEach((file) => URL.revokeObjectURL(file.url));
//     };
//   }, [files]);

//   return (
//     <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg relative">
//       <h1 className="text-2xl font-bold text-[#012169] mb-4">Upload Files</h1>

//       {/* File Upload Input */}
//       <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//         <input
//           type="file"
//           multiple
//           className="hidden"
//           id="file-upload"
//           onChange={handleFileUpload}
//           accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
//         />
//         <label
//           htmlFor="file-upload"
//           className="cursor-pointer bg-[#012169] text-white px-6 py-3 rounded-md inline-block hover:bg-[#0038a8]"
//         >
//           Select Files
//         </label>
//         <p className="mt-2 text-gray-500">Upload PDF, images, or documents (Max 5MB each)</p>
//       </div>
//       {/* URL Upload Input */}
//       <div className="mt-4 text-center text-black">
//         <input
//           type="text"
//           value={urlInput}
//           onChange={(e) => setUrlInput(e.target.value)}
//           placeholder="Enter website URL"
//           className="border border-gray-300 px-4 py-2 rounded-md w-5/6"
//         />
//         <button
//           onClick={handleUrlUpload}
//           className="ml-2 !bg-[#012169] text-white px-4 py-2 rounded-md hover:bg-[#0038a8]"
//         >
//           Add URL
//         </button>
//       </div>


//       {/* Error Message */}
//       {error && <div className="mt-4 p-3 bg-red-50 text-red-800 rounded">{error}</div>}

//       {/* File List */}
//       <div className="mt-4 border border-gray-200 rounded-lg p-4">
//         {files.length === 0 ? (
//           <p className="text-gray-500 text-center">No files uploaded yet.</p>
//         ) : (
//           <ul className="space-y-2">
//             {files.map((file) => (
//               <li
//                 key={file.name}
//                 className="flex justify-between items-center bg-gray-100 p-3 rounded-md cursor-pointer hover:bg-gray-200"
//                 onClick={() => handlePreview(file)}
//               >
//                 <span className="text-black font-medium">{file.name}</span>
//                 <div className="flex space-x-3">
//                   <a
//                     href={file.url}
//                     download={file.name}
//                     className="mt-3"
//                   >
//                     <img src="/public/download.svg" alt="Download" className="w-5 h-5" />
//                   </a>
//                   <button
//                     className="!bg-gray-100 text-red-600 hover:text-red-800"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       removeFile(file.name);
//                     }}
//                   >
//                     ✖
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Review Button */}
//       <div className="mt-6 flex justify-center">
//         <button className="!bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition" onClick={() => navigate("/review")}>
//           Review
//         </button>
//       </div>

//       {/* Chat Popup Button */}
//       <ChatPopup/>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatPopup from "../src/components/ChatPopup";

export default function FileUploader() {
  const [files, setFiles] = useState([]);
  const [urlInput, setUrlInput] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const navigate = useNavigate();
  const [sessionId] = useState(() => {
    // Generate or retrieve existing session ID
    const id = Date.now().toString();
    localStorage.setItem('sessionId', id);
    return id;
  });

  const handleFileUpload = async (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setError("");
    setIsProcessing(true);

    const formData = new FormData();
    formData.append("file", uploadedFiles[0]); // Single file upload

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Session-ID": sessionId,
        },
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Upload failed");

      setApiResponse(result);
      
      // Add to files list with processed data
      const newFile = {
        name: uploadedFiles[0].name,
        type: uploadedFiles[0].name.split('.').pop().toLowerCase(),
        url: URL.createObjectURL(uploadedFiles[0]),
        processedData: result.mlResponse
      };
      setFiles([...files, newFile]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUrlUpload = async () => {
    if (!urlInput.trim()) {
      setError("Please enter a valid URL.");
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch("http://localhost:5000/upload-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Session-ID": sessionId,
        },
        body: JSON.stringify({ url: urlInput }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to process URL");

      setApiResponse(result);
      
      const newUrlFile = {
        name: result.urlInfo?.url || urlInput,
        type: "url",
        url: urlInput,
        processedData: result.mlResponse
      };
      setFiles([...files, newUrlFile]);
      setUrlInput("");
    } catch (err) {
      console.error("Error uploading URL:", err);
      setError(err.message || "Failed to process URL");
    } finally {
      setIsProcessing(false);
    }
  };

  const removeFile = (fileName) => {
    setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg relative">
      <h1 className="text-2xl font-bold text-[#012169] mb-4">Upload Files</h1>

      {/* File Upload Input */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          className="hidden"
          id="file-upload"
          onChange={handleFileUpload}
          accept=".pdf,.png,.jpg,.jpeg,.txt"
          disabled={isProcessing}
        />
        <label
          htmlFor="file-upload"
          className={`cursor-pointer ${
            isProcessing ? 'bg-gray-400' : 'bg-[#012169] hover:bg-[#0038a8]'
          } text-white px-6 py-3 rounded-md inline-block`}
        >
          {isProcessing ? "Processing..." : "Select File"}
        </label>
        <p className="mt-2 text-gray-500">Upload documents (Max 5MB)</p>
      </div>

      {/* URL Upload Input */}
      <div className="mt-4 text-center">
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Enter website URL"
          className="border border-gray-300 px-4 py-2 rounded-md w-5/6"
          disabled={isProcessing}
        />
        <button
          onClick={handleUrlUpload}
          disabled={isProcessing}
          className={`ml-2 ${
            isProcessing ? 'bg-gray-400' : 'bg-[#012169] hover:bg-[#0038a8]'
          } text-white px-4 py-2 rounded-md`}
        >
          {isProcessing ? "Processing..." : "Add URL"}
        </button>
      </div>

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-lg text-center">
          <p>Processing with AI...</p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full animate-pulse" style={{width: "45%"}}></div>
          </div>
        </div>
      )}

      {/* API Response Display */}
      {apiResponse && (
        <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h3 className="font-semibold mb-2">AI Analysis Results:</h3>
          <div className="bg-white p-3 rounded-md">
            {apiResponse.mlResponse?.message && (
              <p className="mb-2"><strong>Status:</strong> {apiResponse.mlResponse.message}</p>
            )}
            {apiResponse.mlResponse?.classification && (
              <div className="mt-3">
                <h4 className="font-medium">Requirements Classification:</h4>
                <pre className="text-sm bg-gray-100 p-2 rounded overflow-x-auto">
                  {typeof apiResponse.mlResponse.classification === 'string' 
                    ? apiResponse.mlResponse.classification 
                    : JSON.stringify(apiResponse.mlResponse.classification, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* File List */}
      <div className="mt-4 border border-gray-200 rounded-lg p-4">
        {files.length === 0 ? (
          <p className="text-gray-500 text-center">No files processed yet</p>
        ) : (
          <ul className="space-y-2">
            {files.map((file) => (
              <li
                key={file.name}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-md"
              >
                <div>
                  <span className="text-black font-medium">{file.name}</span>
                  {file.processedData && (
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Processed
                    </span>
                  )}
                </div>
                <button
                  className="!bg-gray-100 text-red-600 hover:text-red-800"
                  onClick={() => removeFile(file.name)}
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Review Button */}
      <div className="mt-6 flex justify-center">
        <button 
          className={`${
            files.length === 0 ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          } text-white px-6 py-3 rounded-md transition`}
          onClick={() => navigate("/review")}
          disabled={files.length === 0}
        >
          Review Requirements
        </button>
      </div>

      {/* Chat Popup */}
      <ChatPopup sessionId={sessionId} />
    </div>
  );
}