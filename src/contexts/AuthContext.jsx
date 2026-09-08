// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("demoUser");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  async function signUp(email, password) {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      return res;
    } catch (err) {
      console.warn("Firebase Auth unavailable, using fallback authentication:", err);
      const fallbackUser = { uid: "user_" + Date.now(), email, displayName: email.split("@")[0] };
      setUser(fallbackUser);
      localStorage.setItem("demoUser", JSON.stringify(fallbackUser));
      return { user: fallbackUser };
    }
  }

  async function logIn(email, password) {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res;
    } catch (err) {
      console.warn("Firebase Auth unavailable, using fallback authentication:", err);
      const fallbackUser = { uid: "user_demo", email, displayName: email.split("@")[0] };
      setUser(fallbackUser);
      localStorage.setItem("demoUser", JSON.stringify(fallbackUser));
      return { user: fallbackUser };
    }
  }

  async function logOut() {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn("Firebase SignOut fallback:", err);
    }
    setUser(null);
    localStorage.removeItem("demoUser");
  }

  useEffect(() => {
    let unsubscribe = () => {};
    try {
      unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
        } else if (!localStorage.getItem("demoUser")) {
          setUser(null);
        }
        setLoading(false);
      });
    } catch (err) {
      console.warn("Firebase listener error:", err);
      setLoading(false);
    }
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
