// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  Edit, LogOut, Mail, User, Phone, Briefcase, Bug, 
  Folder, Save, X, Settings, ChevronRight, Bell, HelpCircle 
} from "lucide-react";

const Profile = () => {
  const { user, logOut } = useAuth(); // Use 'user' instead of 'currentUser'
  const navigate = useNavigate();

  // Enhanced state management with proper fallbacks
  const [userData, setUserData] = useState({
    name: localStorage.getItem("profileName") || user?.displayName || "John Doe",
    job: localStorage.getItem("profileJob") || user?.jobTitle || "Software Engineer",
    contact: localStorage.getItem("profileContact") || user?.phoneNumber || "+1234567890",
    email: localStorage.getItem("profileEmail") || user?.email || "johndoe@example.com",
  });

  const [isEditing, setIsEditing] = useState({
    name: false,
    job: false,
    contact: false,
    email: false,
  });

  // Temporary state for editing without immediate application
  const [tempData, setTempData] = useState({...userData});

  useEffect(() => {
    // Save changes to localStorage
    Object.entries(userData).forEach(([key, value]) => {
      localStorage.setItem(`profile${key.charAt(0).toUpperCase() + key.slice(1)}`, value);
    });
  }, [userData]);

  const handleLogout = () => {
    logOut();
    navigate("/login");
  };

  const toggleEdit = (field) => {
    // Reset temp data when starting to edit
    if (!isEditing[field]) {
      setTempData(prev => ({...prev, [field]: userData[field]}));
    }
    
    setIsEditing(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = (field) => {
    setUserData(prev => ({
      ...prev,
      [field]: tempData[field],
    }));
    toggleEdit(field);
  };

  const handleCancel = (field) => {
    setTempData(prev => ({
      ...prev,
      [field]: userData[field],
    }));
    toggleEdit(field);
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderEditableField = (label, field, Icon) => (
    <div className="flex items-center justify-between py-4 px-6 bg-white rounded-lg shadow-sm mb-3">
      <div className="flex items-center space-x-4">
        <div className="bg-blue-50 p-2 rounded-lg">
          <Icon className="text-blue-600 w-5 h-5" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          {isEditing[field] ? (
            <input
              type="text"
              value={tempData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent text-gray-800 py-1 w-full"
              autoFocus
            />
          ) : (
            <p className="font-medium text-gray-800">{userData[field]}</p>
          )}
        </div>
      </div>
      <div className="flex space-x-2">
        {isEditing[field] ? (
          <>
            <button 
              onClick={() => handleSave(field)} 
              className="p-1 text-green-600 hover:bg-green-50 rounded"
              title="Save"
            >
              <Save className="w-5 h-5" />
            </button>
            <button 
              onClick={() => handleCancel(field)} 
              className="p-1 text-red-600 hover:bg-red-50 rounded"
              title="Cancel"
            >
              <X className="w-5 h-5" />
            </button>
          </>
        ) : (
          <button 
            onClick={() => toggleEdit(field)} 
            className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
            title="Edit"
          >
            <Edit className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-800 mb-4">You need to log in first.</p>
          <button 
            onClick={() => navigate('/login')} 
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">          
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome, {userData.name.split(" ")[0]}</h1>
              <p className="text-gray-500">{userData.job}</p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
          {renderEditableField("Full Name", "name", User)}
          {renderEditableField("Job Title", "job", Briefcase)}
          {renderEditableField("Phone Number", "contact", Phone)}
          {renderEditableField("Email Address", "email", Mail)}
        </div>

        {/* My Projects Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">My Projects</h2>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-800">View All</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[{
              name: "Project Alpha", status: "Active", progress: 75
            },{
              name: "Project Beta", status: "Planning", progress: 25
            },{
              name: "Project Gamma", status: "Completed", progress: 100
            }].map((project, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="text-sm text-gray-500">{project.status}</div>
                  <div className="text-xl font-medium text-gray-800">{project.name}</div>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-lg">
                  <div
                    style={{ width: `${project.progress}%` }}
                    className="bg-blue-500 h-2 rounded-lg"
                  />
                </div>
                <div className="text-sm text-gray-500 mt-3">Progress: {project.progress}%</div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-3 text-white !bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          <LogOut className="w-5 h-5 inline-block mr-2" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
