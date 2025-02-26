import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleSignUp = () =>{
    const navigate = useNavigate()
    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth)
        {
          navigate('/')
        }
      })

    const handleGoogleSignIn = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        const idToken = await user.getIdToken(); // Get Firebase token
        console.warn(idToken)
        // Send token to backend for verification and JWT issuance
        const response = await fetch("http://localhost:5000/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }),
      });
        console.log("Google Sign-In Success:", user);
        
        // Save user info to localStorage or send to backend if needed
        localStorage.setItem("user", JSON.stringify(user));
       
    } catch (error) {
        console.error("Google Sign-In Error:", error);
    }}
   

    

    return(
     <div>
     <button onClick={handleGoogleSignIn} className="google-signin-button"> Sign in with Google </button>
        </div>
        )

};

export default GoogleSignUp;