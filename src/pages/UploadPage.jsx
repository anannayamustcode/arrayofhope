import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

export default function FileUploader() {
  const [files, setFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ Initialize navigation function

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    let newFiles = [...files];

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
    setPreviewFile(file);
  };

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
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-[#012169] text-white px-6 py-3 rounded-md inline-block hover:bg-[#0038a8]"
        >
          Select Files
        </label>
        <p className="mt-2 text-gray-500">Upload any file (Max 5MB each)</p>
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

      {/* Subtle Preview Section Below */}
      {previewFile && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
          <h2 className="text-lg font-semibold mb-2 text-black">
            Preview: {previewFile.name}
          </h2>

          {/* PDF Preview */}
          {previewFile.type === "pdf" ? (
            <Document
              file={previewFile.url}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              className="border border-gray-300 p-2"
            >
              {Array.from(new Array(numPages), (_, index) => (
                <Page key={index} pageNumber={index + 1} width={500} />
              ))}
            </Document>
          ) : previewFile.type === "png" ||
            previewFile.type === "jpg" ||
            previewFile.type === "jpeg" ? (
            /* Image Preview */
            <img
              src={previewFile.url}
              alt="Preview"
              className="max-w-full h-auto rounded"
            />
          ) : (
            /* Non-previewable file */
            <p className="text-black">Cannot preview this file type.</p>
          )}
        </div>
      )}

      {/* Summarize Button */}
      <div className="mt-6 flex justify-center">
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
          onClick={() => navigate("/summary")} // ✅ Navigate on click
        >
          Summarize
        </button>
      </div>
    </div>
  );
}
