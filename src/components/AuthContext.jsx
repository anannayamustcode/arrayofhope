import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage on initial load
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password, userType) => {
    // In a real app, this would be an API call
    const user = { 
      email, 
      userType,
      name: email.split('@')[0], // Mock name from email
      id: Math.random().toString(36).substr(2, 9) // Mock ID
    };
    
    localStorage.setItem("user", JSON.stringify(user));
    setCurrentUser(user);
    return user;
  };

  // Signup function
  const signup = (name, email, password, userType) => {
    // In a real app, this would be an API call
    const user = { 
      email, 
      name,
      userType,
      id: Math.random().toString(36).substr(2, 9) // Mock ID
    };
    
    localStorage.setItem("user", JSON.stringify(user));
    setCurrentUser(user);
    return user;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};