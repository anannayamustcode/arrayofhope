import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import logo from "../assets/logo.svg";
import barc from "../assets/barc.svg";

export default function Navigation() {
  const location = useLocation();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/upload", name: "Upload" },
    { path: "/review", name: "Review" },
    { path: "/export", name: "Export" },
    { path: "/collaborate", name: "Collaborate" },
  ];

  return (
    <nav className="bg-[#012169] text-white shadow-md w-full relative z-20">
      <div className="w-full max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center py-2">
          <h1 className="text-xl font-bold">
            <Link to="/" className="!text-white flex items-center space-x-3 sm:space-x-4">
              <img src={logo} alt="Logo" className="h-7 sm:h-9" />
              <img src={barc} alt="Logo" className="h-6 sm:h-8" />
            </Link>
          </h1>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
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
                    className={`!text-white px-3 py-2 rounded-md text-sm font-medium transition ${
                      location.pathname === item.path
                        ? "bg-[#FFD700] !text-[#012169] font-semibold"
                        : "hover:bg-blue-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link to="/profile" className="text-white text-3xl sm:text-4xl hover:opacity-80">
                  <FaUserCircle />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {user && (
              <Link to="/profile" className="text-white text-3xl">
                <FaUserCircle />
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-blue-800 text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-2 pb-4 space-y-2 border-t border-blue-800">
            {!user ? (
              <div className="flex flex-col space-y-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="!text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="!text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition ${
                      location.pathname === item.path
                        ? "bg-[#FFD700] !text-[#012169] font-semibold"
                        : "!text-white hover:bg-blue-800"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
