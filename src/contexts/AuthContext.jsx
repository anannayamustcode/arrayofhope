// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ ADD THIS

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // ✅ FIXED: now this works
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user, loading }}>
      {!loading && children} {/* ✅ Prevent rendering until auth is ready */}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
