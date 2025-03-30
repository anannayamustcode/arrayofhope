import { useState } from "react";
import Sidebar from "../components/Sidebar";

const teamMembers = [
  { id: 1, name: "Alice Johnson", role: "Project Manager", status: "Online" },
  { id: 2, name: "Bob Smith", role: "Lead Developer", status: "Offline" },
  { id: 3, name: "Charlie Adams", role: "UI/UX Designer", status: "Online" },
  { id: 4, name: "Dana White", role: "Backend Engineer", status: "Offline" },
];

const Collaborate = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - fixed width of 64 units */}
      <Sidebar />
      
      {/* Main Content Area - offset by sidebar width */}
      <div className="ml-64 flex-1 p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Team Collaboration</h2>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Team Members</h3>
            <ul className="space-y-3">
              {teamMembers.map((member) => (
                <li
                  key={member.id}
                  className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedMember?.id === member.id 
                      ? "bg-blue-50 border border-blue-200" 
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedMember(member)}
                >
                  <div>
                    <p className="font-medium text-gray-800">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      member.status === "Online" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {member.status}
                  </span>
                </li>
              ))}
            </ul>

            {selectedMember && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-800">{selectedMember.name}</h3>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="font-medium">{selectedMember.role}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className={`font-medium ${
                      selectedMember.status === "Online" 
                        ? "text-green-600" 
                        : "text-red-600"
                    }`}>
                      {selectedMember.status}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaborate;