// frontend/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDltP5j9FZ5nFKUH-jvkKjInfnfQKFYJO8",
  authDomain: "mern-auth-7e70e.firebaseapp.com",
  projectId: "mern-auth-7e70e",
  storageBucket: "mern-auth-7e70e.firebasestorage.app",
  messagingSenderId: "694599441514",
  appId: "1:694599441514:web:f25c390ba55c449f8c3e13",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
