import { Link } from "react-router-dom";
import { LayoutDashboard, Users, MessageSquare } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col p-4 space-y-4">
          <h1 className="text-xl font-bold">
            <Link to="/" className="!text-white">Barclays</Link>
          </h1>
      <nav className="space-y-3">
        <Link to="/dashboard" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          <LayoutDashboard /> <span>Dashboard</span>
        </Link>
        <Link to="/collaborate" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          <Users /> <span>Collaborate</span>
        </Link>      <Link to="/flowchart" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          <Users /> <span>Flowchart</span>
        </Link>
        <Link to="/chat" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          <MessageSquare /> <span>Team Chat</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;