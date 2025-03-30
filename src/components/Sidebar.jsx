import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Calendar,
  GitBranch,
  FileText
} from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { path: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { path: "/collaborate", icon: <Users size={20} />, label: "Collaborate" },
    { path: "/summary", icon: <FileText size={20} />, label: "Negotiation" },
    { path: "/flowchart", icon: <GitBranch size={20} />, label: "Flowchart" },
    { path: "/chat", icon: <MessageSquare size={20} />, label: "Team Chat" },
    { path: "/calendar", icon: <Calendar size={20} />, label: "Calendar" }
  ];

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-900 !text-white flex flex-col p-4 shadow-lg z-10">
      <div className="mb-6">
        <h1 className="text-xl font-bold">
          <Link to="/" className="!text-white hover:text-gray-200 transition-colors">
            Barclays
          </Link>
        </h1>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path} 
            className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md transition-colors duration-200"
          >
            <span className="!text-gray-300">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;