import { Link } from "react-router-dom";
import { LayoutDashboard, Users, MessageSquare, Calendar, ArrowLeft } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white flex flex-col p-4 space-y-4 z-10">
      <div className="flex items-center space-x-2">
        <Link to="/" className="p-2 hover:bg-gray-700 rounded transition-colors">
          <ArrowLeft />
        </Link>
        <h1 className="font-bold" style={{ fontSize: '42px' }}>
          <Link to="/" className="!text-white">Barclays</Link>
        </h1>
      </div>
      <nav className="space-y-3">
        <Link 
          to="/dashboard" 
          className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded transition-colors"
        >
          <LayoutDashboard /> <span>Dashboard</span>
        </Link>
        <Link 
          to="/collaborate" 
          className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded transition-colors"
        >
          <Users /> <span>Collaborate</span>
        </Link> 
        <Link to="/summary" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          <Users /> <span>Negotiation</span>
        </Link>     
        <Link to="/flowchart" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          <Users /> <span>Flowchart</span>
        </Link>
        <Link 
          to="/chat" 
          className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded transition-colors"
        >
          <MessageSquare /> <span>Team Chat</span>
        </Link>
        <Link 
          to="/calendar" 
          className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded transition-colors"
        >
          <Calendar /> <span>Calendar</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
