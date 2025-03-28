export default function ExportPage() {
    return (
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-[#012169] mb-6">Export Requirements</h1>
        
        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <h2 className="font-semibold text-lg mb-3">Document Format</h2>
            <div className="flex flex-wrap gap-4">
              <button className="border px-4 py-2 rounded-lg hover:bg-gray-50">
                Microsoft Word (.docx)
              </button>
              <button className="border px-4 py-2 rounded-lg hover:bg-gray-50">
                Excel (.xlsx)
              </button>
              <button className="border px-4 py-2 rounded-lg hover:bg-gray-50">
                PDF
              </button>
            </div>
          </div>
  
          <div className="border rounded-lg p-6">
            <h2 className="font-semibold text-lg mb-3">Integration Options</h2>
            <div className="flex flex-wrap gap-4">
              <button className="border px-4 py-2 rounded-lg hover:bg-gray-50">
                JIRA Import
              </button>
              <button className="border px-4 py-2 rounded-lg hover:bg-gray-50">
                Confluence
              </button>
            </div>
          </div>
  
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Version Control</h3>
              <p className="text-sm text-gray-500">Current version: v1.2</p>
            </div>
            <button className="bg-[#012169] text-white px-6 py-3 rounded-lg">
              Export All
            </button>
          </div>
        </div>
      </div>
    )
  }