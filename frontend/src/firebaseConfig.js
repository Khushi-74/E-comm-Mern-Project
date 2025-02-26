
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDltP5j9FZ5nFKUH-jvkKjInfnfQKFYJO8",
  authDomain: "mern-auth-7e70e.firebaseapp.com",
  projectId: "mern-auth-7e70e",
  storageBucket: "mern-auth-7e70e.firebasestorage.app",
  messagingSenderId: "694599441514",
  appId: "1:694599441514:web:f25c390ba55c449f8c3e13"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();