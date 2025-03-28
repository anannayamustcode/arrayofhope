import React, { useState } from 'react';
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { Edit, LogOut, Mail, User, Phone, Briefcase, Bug } from 'lucide-react';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(currentUser?.name || '');
  const [job, setJob] = useState(currentUser?.jobTitle || '');
  const [contact, setContact] = useState(currentUser?.phoneNumber || '');
  const [email, setEmail] = useState(currentUser?.email || '');

  const [isEditing, setIsEditing] = useState({
    name: false,
    job: false,
    contact: false,
    email: false
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleEdit = (field) => {
    setIsEditing(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSave = (field) => {
    toggleEdit(field);
  };

  const renderEditableField = (label, value, setValue, field) => {
    return (
      <div className="flex items-center justify-between mb-4 p-3 bg-gray-100 rounded-lg">
        <div className="flex items-center space-x-3">
          {field === 'name' && <User className="text-black" />}
          {field === 'job' && <Briefcase className="text-black" />}
          {field === 'contact' && <Phone className="text-black" />}
          {field === 'email' && <Mail className="text-black" />}
          
          {isEditing[field] ? (
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="border-b border-black focus:outline-none focus:border-black bg-transparent text-black"
            />
          ) : (
            <span className="text-black">{value}</span>
          )}
        </div>
        
        <button 
          onClick={() => isEditing[field] ? handleSave(field) : toggleEdit(field)}
          className="!bg-gray-100 text-black hover:text-gray-600 "
          >
          <Edit className="w-5 h-5" />
        </button>
      </div>
    );
  };

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <p className="text-xl text-black">You need to log in first.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-black">My Profile</h2>
        </div>

        {renderEditableField('Name', name, setName, 'name')}
        {renderEditableField('Job Title', job, setJob, 'job')}
        {renderEditableField('Contact', contact, setContact, 'contact')}
        {renderEditableField('Email', email, setEmail, 'email')}

        <div className="mt-6 flex justify-between items-center">
          <button onClick={() => {/* Implement bug report functionality */}} className="!bg-white text-black hover:text-gray-600">
            <Bug className="!bg-gray-100 w-6 h-6" />
          </button>

          <button 
            onClick={handleLogout} 
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
