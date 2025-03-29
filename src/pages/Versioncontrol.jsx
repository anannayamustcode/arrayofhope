import { useState } from "react";

export default function VersionControl() {
  const [versions, setVersions] = useState([
    { version: "v1.0", date: "2025-03-01", changes: "Initial release" },
    { version: "v1.1", date: "2025-03-10", changes: "Bug fixes and improvements" },
    { version: "v1.2", date: "2025-03-20", changes: "New feature added" },
  ]);

  const [currentVersion, setCurrentVersion] = useState("v1.2");

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-[#012169] mb-6">Version Control</h1>

      {/* Current Version */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Current Version</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-xl font-medium">{currentVersion}</p>
          <p className="text-sm text-gray-500">Last updated: {versions.find(v => v.version === currentVersion)?.date}</p>
        </div>
      </div>

      {/* Version History */}
      <div>
        <h2 className="font-semibold text-lg mb-4">Version History</h2>
        <ul className="space-y-4">
          {versions.map((version) => (
            <li key={version.version} className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="font-medium">{version.version}</h3>
                <p className="text-sm text-gray-500">{version.changes}</p>
              </div>
              <span
                className={`px-4 py-1 rounded-full ${
                  version.version === currentVersion ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"
                }`}
              >
                {version.version === currentVersion ? "Current" : "Previous"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
