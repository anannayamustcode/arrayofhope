import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Calendar, 
  Menu, 
  Home, 
  Workflow, 
  Handshake
} from "lucide-react";
import barc from "../assets/barc.svg"; // Adjust path if necessary

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className={`fixed top-0 left-0 h-full ${isCollapsed ? "w-18" : "w-64"} bg-gray-900 text-white flex flex-col p-4 transition-all duration-300 z-10`}>
      
      {/* Hamburger Menu */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)} 
        className="p-1 rounded !bg-[#101828] w-0 leftransition self-start ml-[-11px]"
      >
        <Menu />
      </button>

      <div className={`flex items-center space-x-2 ${isCollapsed ? "justify-center" : ""} mt-4`}>
      <h1 className="text-xl font-bold">
  <Link to="/" className="!text-white flex items-center space-x-5"> {/* Added flex and spacing */}
    <img src={barc} alt="Logo" className="h-8" />
  </Link>
</h1>

      </div>

      <nav className="space-y-3 mt-6">
        <Link to="/" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded transition">
          <Home />
          <span className={`${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"} transition-all duration-300`}>Home</span>
        </Link>     

        <Link to="/dashboard" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded transition">
          <LayoutDashboard />
          <span className={`${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"} transition-all duration-300`}>Dashboard</span>
        </Link>

        <Link to="/collaborate" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded transition">
          <Users />
          <span className={`${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"} transition-all duration-300`}>Collaborate</span>
        </Link>

        <Link to="/summary" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded transition">
          <Handshake />
          <span className={`${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"} transition-all duration-300`}>Negotiation</span>
        </Link>     

        <Link to="/flowchart" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded transition">
          <Workflow />
          <span className={`${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"} transition-all duration-300`}>Flowchart</span>
        </Link>

        <Link to="/chat" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded transition">
          <MessageSquare />
          <span className={`${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"} transition-all duration-300`}>Team Chat</span>
        </Link>

        <Link to="/calendar" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded transition">
          <Calendar />
          <span className={`${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"} transition-all duration-300`}>Calendar</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
