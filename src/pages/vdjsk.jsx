import { useState } from 'react';

export default function UploadPage() {
  const [previewContent, setPreviewContent] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setFileName(file.name);
    
    // Simple text file handling
    if (file.type.includes('text') || file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewContent(e.target.result);
      reader.readAsText(file);
    } 
    // Basic PDF handling (just show file info)
    else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      setPreviewContent(`PDF file selected: ${file.name}\n\n(Full PDF text extraction would require additional libraries)`);
    }
    // Other file types
    else {
      setPreviewContent(`File selected: ${file.name}\nType: ${file.type || 'Unknown'}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-[#012169] mb-6">
        Upload Banking Documents
      </h1>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
        <input
          type="file"
          className="hidden"
          id="file-upload"
          onChange={handleFileUpload}
          accept=".pdf,.docx,.xlsx,.txt,.png,.jpg"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-[#012169] text-white px-6 py-3 rounded-md inline-block"
        >
          Select Files
        </label>
        <p className="mt-4 text-gray-500">PDF, Word, Excel, or Images</p>
        {fileName && (
          <p className="mt-2 text-sm text-green-600">Selected: {fileName}</p>
        )}
      </div>

      {/* File Preview Section - Always shown but empty initially */}
      <div className="mt-6 border-2 border-gray-200 rounded-lg p-4 h-64 overflow-auto">
        <h3 className="font-medium mb-2">File Preview:</h3>
        {previewContent ? (
          <pre className="text-sm font-mono bg-gray-50 p-2 rounded whitespace-pre-wrap">
            {previewContent}
          </pre>
        ) : (
          <p className="text-gray-400 text-center mt-16">No file selected or preview available</p>
        )}
      </div>

      <div className="mt-8">
        <h2 className="font-semibold mb-2">Sample Banking Documents:</h2>
        <ul className="space-y-2">
          <li 
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => {
              setFileName("Loan Approval Process.pdf");
              setPreviewContent("Loan Approval Policy\n\n1. Applicant must provide:\n- 3 months bank statements\n- Proof of income\n- Credit score >650\n\n2. Approval Process:\n- Automated check for basic criteria\n- Manual review for loans >£50,000");
            }}
          >
            Loan Approval Process.pdf
          </li>
          <li 
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => {
              setFileName("KYC Requirements.docx");
              setPreviewContent("KYC Requirements\n\n1. Identity Verification:\n- Passport or driving license\n- Recent utility bill\n\n2. Enhanced Due Diligence:\n- Required for PEPs\n- Required for transactions >£10,000");
            }}
          >
            KYC Requirements.docx
          </li>
        </ul>
      </div>
    </div>
  );
}