export default function UploadPage() {
    const handleFileUpload = (e) => {
      const files = e.target.files
      console.log('Uploaded files:', files)
    }
  
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
            multiple
            onChange={handleFileUpload}
            accept=".pdf,.docx,.xlsx,.png,.jpg"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-[#012169] text-white px-6 py-3 rounded-md inline-block"
          >
            Select Files
          </label>
          <p className="mt-4 text-gray-500">PDF, Word, Excel, or Images</p>
        </div>
        <div className="mt-8">
          <h2 className="font-semibold mb-2">Sample Banking Documents:</h2>
          <ul className="space-y-2">
            <li className="text-blue-600 hover:underline cursor-pointer">
              Loan Approval Process.pdf
            </li>
            <li className="text-blue-600 hover:underline cursor-pointer">
              KYC Requirements.docx
            </li>
          </ul>
        </div>
      </div>
    )
  }