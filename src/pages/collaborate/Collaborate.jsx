// pages/Collaborate.js
import { useState } from "react";
import Sidebar from "../../components/Sidebar";

const teamMembers = [
  { id: 1, name: "Alice Johnson", role: "Project Manager", status: "Online" },
  { id: 2, name: "Bob Smith", role: "Lead Developer", status: "Offline" },
  { id: 3, name: "Charlie Adams", role: "UI/UX Designer", status: "Online" },
  { id: 4, name: "Dana White", role: "Backend Engineer", status: "Offline" },
];

const Collaborate = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <h2 className="text-black text-2xl font-bold mb-4">Team Members</h2>
        <ul className="space-y-3">
          {teamMembers.map((member) => (
            <li
              key={member.id}
              className="text-black flex justify-between items-center bg-gray-100 p-3 rounded cursor-pointer hover:bg-gray-200"
              onClick={() => setSelectedMember(member)}
            >
              <span>{member.name}</span>
              <span className={`text-sm ${member.status === "Online" ? "text-green-500" : "text-red-500"}`}>
                {member.status}
              </span>
            </li>
          ))}
        </ul>

        {selectedMember && (
          <div className="mt-6 bg-white p-4 shadow rounded-lg">
            <h3 className="text-xl font-semibold">{selectedMember.name}</h3>
            <p className="text-gray-600">Role: {selectedMember.role}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collaborate;
