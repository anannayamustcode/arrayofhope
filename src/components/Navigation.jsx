import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.svg";
import barc from "../assets/barc.svg";

export default function Navigation() {
  const location = useLocation();
  const { currentUser } = useAuth();

  const navItems = [
    { path: "/upload", name: "Upload" },
    { path: "/review", name: "Review" },
    { path: "/export", name: "Export" },
    { path: "/collaborate", name: "Collaborate" },
  ];

  return (
    <nav className="bg-[#012169] text-white shadow-md w-full">
      <div className="w-full max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center py-2">
          <h1 className="text-xl font-bold">
            <Link to="/" className="!text-white flex items-center space-x-4">
              <img src={logo} alt="Logo" className="h-9" />
              <img src={barc} alt="Logo" className="h-8" />
            </Link>
          </h1>

          <div className="flex space-x-4">
            {!currentUser ? (
              <>
                <Link to="/login" className="!text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                  Login
                </Link>
                <Link to="/signup" className="!text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                  Signup
                </Link>
              </>
            ) : (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`!text-white px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === item.path
                        ? "bg-[#FFD700] text-[#012169]"
                        : "hover:bg-blue-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link to="/profile" className="text-white text-4xl">
                  <FaUserCircle />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}