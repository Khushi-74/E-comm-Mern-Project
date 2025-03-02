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
        const collectData = async ()=>{
            console.warn(name,email,password)
            let result = await fetch(
                'http://localhost:5000/signup',
                {
                    method:"Post",
                    body:JSON.stringify({name,email,password}),  //bina json ke data ni leta
                    headers:{
                        'Content-Type':'application/json'
                    }
                }
            )
            result = await result.json();

            console.warn(result)
            localStorage.setItem("user",JSON.stringify(result.user))  //browser ke local storage me store krna //browser close hone pe bhi data rhega 
            localStorage.setItem("token",JSON.stringify(result.auth))
            navigate('/')
        }
   
    return(
        <div className="Signup">
            <h3>Dive Into World Of Electronics !</h3>

            <div className="input-group">
            <label>Name</label>
            <input className= "inputBox"
             type = "text" 
             value ={name}
              onChange={(e)=>setName(e.target.value)}
             placeholder ="Enter Name"></input>
                </div>


                <div className="input-group">
                <label>Email</label>
            <input className= "inputBox" type = "text" value ={email} onChange={(e)=>setEmail(e.target.value)}
             placeholder ="Enter Email"></input>
             </div>


             <div className="input-group">
             <label>Password</label>
            <input className= "inputBox" type = "password" value ={password} onChange={(e)=>setPassword(e.target.value)}
             placeholder ="Enter Password"></input>
             </div>

            <button onClick={collectData} className="signupButton" type = "button">Sign Up</button>
        </div>
    )
}

export default Signup