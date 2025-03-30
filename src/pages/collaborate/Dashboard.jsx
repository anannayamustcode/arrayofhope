import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function CollaborationDashboard() {
  const [teamMembers, setTeamMembers] = useState([
    { name: "Alice", role: "Developer", status: "Active" },
    { name: "Bob", role: "Designer", status: "Active" },
    { name: "Charlie", role: "Project Manager", status: "Inactive" },
  ]);

  const [meetingLink, setMeetingLink] = useState("https://calendar-link.com");

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="ml-64 p-8 w-full min-h-screen bg-gray-100">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-[#012169] mb-6">Team Collaboration Dashboard</h1>

          {/* Team Members List */}
          <div className="mb-8">
            <h2 className="font-semibold text-lg mb-4">Team Members</h2>
            <ul className="space-y-4">
              {teamMembers.map((member, index) => (
                <li key={index} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                  <span
                    className={`px-4 py-1 rounded-full ${
                      member.status === "Active" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    {member.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Meeting Link Section */}
          <div className="mb-8">
            <h2 className="font-semibold text-lg mb-4">Upcoming Team Meeting</h2>
            <div className="flex justify-between items-center">
              <p className="text-lg">Join the next meeting:</p>
              <a
                href={meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#012169] text-white px-6 py-3 rounded-lg hover:bg-[#001a4d] transition"
              >
                Join Meeting
              </a>
            </div>
          </div>

          {/* JIRA Integration */}
          <div className="mb-8">
            <h2 className="font-semibold text-lg mb-4">JIRA Integration</h2>
            <div className="space-y-4">
              <button className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                Sync with JIRA Issues
              </button>
              <button className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                View Sprint Board
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}