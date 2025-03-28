import { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Configure PDF.js worker from CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    setIsLoading(true);
    setError('');
    setFile(null);
    setNumPages(null);

    try {
      // Basic validation
      if (!uploadedFile.name.toLowerCase().endsWith('.pdf')) {
        throw new Error('Please upload a valid PDF file');
      }

      if (uploadedFile.size > 10 * 1024 * 1024) {
        throw new Error('File size exceeds 10MB limit');
      }

      // Create object URL for rendering
      const fileUrl = URL.createObjectURL(uploadedFile);
      setFile(fileUrl);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } finally {
      setIsLoading(false);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setError('');
  };

  const onDocumentLoadError = (error) => {
    console.error('PDF load error:', error);
    let errorMessage = 'Failed to load PDF. Please try another file.';
    
    if (error.name === 'PasswordException') {
      errorMessage = 'PDF is password protected and cannot be previewed';
    } else if (error.message.includes('Invalid PDF')) {
      errorMessage = 'The PDF appears to be corrupted or invalid';
    }

    setError(errorMessage);
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const resetFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    setFile(null);
    setError('');
    setNumPages(null);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-[#012169] mb-6">
        Upload Banking Documents
      </h1>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          id="file-upload"
          onChange={handleFileUpload}
          accept=".pdf"
          disabled={isLoading}
        />
        <label
          htmlFor="file-upload"
          className={`cursor-pointer bg-[#012169] text-white px-6 py-3 rounded-md inline-block transition-colors ${
            isLoading ? 'opacity-50' : 'hover:bg-[#0038a8]'
          }`}
        >
          {isLoading ? 'Processing...' : 'Select PDF File'}
        </label>
        <p className="mt-4 text-gray-500">Upload a PDF document (max 10MB)</p>
        {file && (
          <button
            onClick={resetFileInput}
            className="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Clear Selection
          </button>
        )}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-800 rounded text-center">
          {error}
          <button 
            onClick={resetFileInput}
            className="ml-2 text-sm underline"
          >
            Try another file
          </button>
        </div>
      )}

      <div className="mt-6 border-2 border-gray-200 rounded-lg p-4 min-h-64">
        {isLoading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#012169]"></div>
          </div>
        ) : file ? (
          <div className="bg-gray-50 p-3 rounded overflow-auto max-h-[32rem]">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#012169]"></div>
                  <p className="mt-2 text-gray-500">Loading PDF...</p>
                </div>
              }
              options={{
                cMapUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
                cMapPacked: true,
              }}
            >
              {Array.from(new Array(numPages), (_, index) => (
                <div key={`page_${index + 1}`} className="mb-4">
                  <Page
                    pageNumber={index + 1}
                    width={600}
                    renderTextLayer={true}
                    renderAnnotationLayer={false}
                  />
                  {numPages > 1 && (
                    <p className="text-center text-sm text-gray-500 mt-2">
                      Page {index + 1} of {numPages}
                    </p>
                  )}
                </div>
              ))}
            </Document>
          </div>
        ) : (
          <div className="text-gray-400 text-center py-16">
            {error ? 'Upload failed' : 'No PDF selected'}
          </div>
        )}
      </div>
    </div>
  );
}