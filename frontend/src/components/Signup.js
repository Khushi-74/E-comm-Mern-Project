import React, { use } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Signup = ()=>{
    const navigate = useNavigate();
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    
    useEffect(()=>{
      const auth = localStorage.getItem('user')
      if(auth)
      {
        navigate('/')
      }
    })
const collectData = async () => {
    console.warn(name, email, password);
  
    try {
      let result = await fetch("http://localhost:5000/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!result.ok) {
        throw new Error(`Signup failed: ${result.status} ${result.statusText}`);
      }
  
      result = await result.json();
      console.log("Signup Response:", result);
  
      if (result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        console.log("Signup successful:", result);
        navigate("/");
      } else {
        console.error("Signup failed: No token received.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
}
  
  
    return(
        <div className="Signup">
            <h1>signup page</h1>
            <input className= "inputBox" type = "text" value ={name} onChange={(e)=>setName(e.target.value)}
             placeholder ="Enter Name"></input>
            <input className= "inputBox" type = "text" value ={email} onChange={(e)=>setEmail(e.target.value)}
             placeholder ="Enter Email"></input>
            <input className= "inputBox" type = "password" value ={password} onChange={(e)=>setPassword(e.target.value)}
             placeholder ="Enter Password"></input>
            <button onClick={collectData} className="signupButton" type = "button">Sign Up</button>
        </div>
    )
}

export default Signup;