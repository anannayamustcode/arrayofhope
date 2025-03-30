import { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate } from "react-router-dom";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

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

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    let newFiles = [...files];
    setError("");

    uploadedFiles.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        setError(`"${file.name}" exceeds the 5MB limit.`);
      } else {
        const fileType = file.name.split(".").pop().toLowerCase();
        newFiles.push({
          name: file.name,
          type: fileType,
          url: URL.createObjectURL(file),
        });
      }
    });

    setFiles(newFiles);
  };

  const removeFile = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
    if (previewFile?.name === fileName) setPreviewFile(null);
  };

  const handlePreview = (file) => {
    if (file.type === "pdf") {
      setIsLoading(true);
      setPageNumber(1);
    }
    setPreviewFile(file);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error("PDF error:", error);
    setError("Failed to load PDF. Please try another file.");
    setIsLoading(false);
  };

  const goToPrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages));
  const zoomIn = () => setScale(prev => Math.min(prev + 0.25, 3.0));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-[#012169] mb-4">Upload Files</h1>

      {/* File Upload Input */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          multiple
          className="hidden"
          id="file-upload"
          onChange={handleFileUpload}
          accept=".pdf,.png,.jpg,.jpeg"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-[#012169] text-white px-6 py-3 rounded-md inline-block hover:bg-[#0038a8]"
        >
          Select Files
        </label>
        <p className="mt-2 text-gray-500">Upload PDF or images (Max 5MB each)</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-800 rounded">{error}</div>
      )}

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
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.name);
                  }}
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Preview Section */}
      {previewFile && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50" ref={containerRef}>
          <h2 className="text-lg font-semibold mb-2 text-black">
            Preview: {previewFile.name}
          </h2>

          {previewFile.type === "pdf" ? (
            <>
              {isLoading && (
                <div className="text-center py-4">Loading PDF...</div>
              )}
              
              <div className="flex gap-2 mb-4 flex-wrap">
                <button
                  onClick={goToPrevPage}
                  disabled={pageNumber <= 1 || isLoading}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="self-center">
                  Page {pageNumber} of {numPages || "--"}
                </span>
                <button
                  onClick={goToNextPage}
                  disabled={pageNumber >= (numPages || 0) || isLoading}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Next
                </button>
                <button
                  onClick={zoomOut}
                  disabled={isLoading}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 ml-auto"
                >
                  Zoom Out
                </button>
                <span className="self-center">{(scale * 100).toFixed(0)}%</span>
                <button
                  onClick={zoomIn}
                  disabled={isLoading}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Zoom In
                </button>
              </div>

              <Document
                file={previewFile.url}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={<div className="text-center py-4">Loading PDF...</div>}
                className="border border-gray-300 p-2"
              >
                <Page
                  pageNumber={pageNumber}
                  width={containerRef.current?.clientWidth * 0.9}
                  scale={scale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>
            </>
          ) : ["png", "jpg", "jpeg"].includes(previewFile.type) ? (
            <img
              src={previewFile.url}
              alt="Preview"
              className="max-w-full h-auto rounded"
            />
          ) : (
            <p className="text-black">Cannot preview this file type.</p>
          )}
        </div>
      )}

      {/* Summarize Button */}
      <div className="mt-6 flex justify-center">
        <button
          className="!bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
          onClick={() => navigate("/review")}
        >
          Review
        </button>
      </div>
    </div>
  );
}