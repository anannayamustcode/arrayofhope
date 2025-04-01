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
import barc from "../assets/barc.svg";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className={`fixed top-0 left-0 h-full ${isCollapsed ? "w-18" : "w-64"} bg-gray-900 text-white flex flex-col p-4 transition-all duration-300 z-10`}>
      
      {/* Hamburger Menu */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)} 
        className="p-1 rounded !bg-[#101828] w-0 leftransition self-start ml-[-11px] hover:scale-100"
      >
        <Menu size={24} />
      </button>

      <div className={`flex items-center space-x-2 ${isCollapsed ? "justify-center" : ""} mt-4`}>
        <h1 className="text-xl font-bold">
          <Link to="/" className="!text-white flex items-center space-x-5">
            <img src={barc} alt="Logo" className="h-8" />
          </Link>
        </h1>
      </div>

      <nav className="space-y-3 mt-6">
        <Link 
          to="/" 
          className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded transition relative group"
          onMouseEnter={() => setHoveredItem("home")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <Home size={24} className="hover:scale-100" />
          <span className={`${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"} transition-all duration-300`}>Home</span>
          {isCollapsed && hoveredItem === "home" && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap">
              Home
            </div>
          )}
        </Link>     

        <Link 
          to="/dashboard" 
          className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded transition relative group"
          onMouseEnter={() => setHoveredItem("dashboard")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <LayoutDashboard size={24} className="hover:scale-100" />
          <span className={`${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"} transition-all duration-300`}>Dashboard</span>
          {isCollapsed && hoveredItem === "dashboard" && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap">
              Dashboard
            </div>
          )}
        </Link>

        <Link 
          to="/collaborate" 
          className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded transition relative group"
          onMouseEnter={() => setHoveredItem("collaborate")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <Users size={24} className="hover:scale-100" />
          <span className={`${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"} transition-all duration-300`}>Collaborate</span>
          {isCollapsed && hoveredItem === "collaborate" && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap">
              Collaborate
            </div>
          )}
        </Link>

        <Link 
          to="/summary" 
          className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded transition relative group"
          onMouseEnter={() => setHoveredItem("negotiation")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <Handshake size={24} className="hover:scale-100" />
          <span className={`${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"} transition-all duration-300`}>Negotiation</span>
          {isCollapsed && hoveredItem === "negotiation" && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap">
              Negotiation
            </div>
          )}
        </Link>     

        <Link 
          to="/flowchart" 
          className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded transition relative group"
          onMouseEnter={() => setHoveredItem("flowchart")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <Workflow size={24} className="hover:scale-100" />
          <span className={`${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"} transition-all duration-300`}>Flowchart</span>
          {isCollapsed && hoveredItem === "flowchart" && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap">
              Flowchart
            </div>
          )}
        </Link>

        <Link 
          to="/chat" 
          className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded transition relative group"
          onMouseEnter={() => setHoveredItem("chat")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <MessageSquare size={24} className="hover:scale-100" />
          <span className={`${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"} transition-all duration-300`}>Team Chat</span>
          {isCollapsed && hoveredItem === "chat" && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap">
              Team Chat
            </div>
          )}
        </Link>

        <Link 
          to="/calendar" 
          className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded transition relative group"
          onMouseEnter={() => setHoveredItem("calendar")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <Calendar size={24} className="hover:scale-100" />
          <span className={`${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"} transition-all duration-300`}>Calendar</span>
          {isCollapsed && hoveredItem === "calendar" && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap">
              Calendar
            </div>
          )}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;