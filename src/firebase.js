// // src/firebase.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyB7O75NTh2QXO6Spxmoje73XYmIoFb7V4o",
//   authDomain: "barcathon25.firebaseapp.com",
//   projectId: "barcathon25",
//   storageBucket: "barcathon25.firebasestorage.app",
//   messagingSenderId: "873361305196",
//   appId: "1:873361305196:web:460898e4e710ff3c85f249"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Export services
// export const auth = getAuth(app);


// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB7O75NTh2QXO6Spxmoje73XYmIoFb7V4o",
  authDomain: "barcathon25.firebaseapp.com",
  projectId: "barcathon25",
  storageBucket: "barcathon25.firebasestorage.app",
  messagingSenderId: "873361305196",
  appId: "1:873361305196:web:460898e4e710ff3c85f249"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
