import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6-lYEeiD0vM6_pjU_SSXbBVEMzDrOL3o",
  authDomain: "login-for-barclays.firebaseapp.com",
  projectId: "login-for-barclays",
  storageBucket: "login-for-barclays.firebasestorage.app",
  messagingSenderId: "705160222610",
  appId: "1:705160222610:web:63601be30348cb203f134b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app,auth } ;