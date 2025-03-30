import { useNavigate } from "react-router-dom";

export default function ExportPage() {
  const navigate = useNavigate(); // ✅ Added navigation

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-[#012169] mb-6">Export Requirements</h1>

      <div className="space-y-6">
        {/* Document Format Section */}
        <div className="border rounded-lg p-6">
          <h2 className="font-semibold text-lg mb-3">Document Format</h2>
          <div className="flex flex-wrap gap-4">
            {["Microsoft Word (.docx)", "Excel (.xlsx)", "PDF"].map((format) => (
              <button key={format} className="border px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                {format}
              </button>
            ))}
          </div>
        </div>

        {/* Integration Options Section */}
        <div className="border rounded-lg p-6">
          <h2 className="font-semibold text-lg mb-3">Integration Options</h2>
          <div className="flex flex-wrap gap-4">
            {["JIRA Import", "Confluence"].map((option) => (
              <button key={option} className="border px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Version Control and Actions */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Version Control</h3>
            <p className="text-sm text-gray-500">Current version: v1.2</p>
          </div>

          <div className="flex gap-3">
            {/* ✅ Navigate to History Page */}
            <button 
              onClick={() => navigate("/history")} 
              className="!bg-[#012169] text-white px-6 py-3 rounded-lg hover:bg-[#001a4d] transition"
            >
              History
            </button>

            <button className="!bg-[#012169] text-white px-6 py-3 rounded-lg hover:bg-[#001a4d] transition">
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
