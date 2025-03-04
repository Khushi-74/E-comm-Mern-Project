import React, { use } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



const Signup = ()=>{
    const navigate = useNavigate();
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const [errors, setErrors] = useState({});
    
    useEffect(()=>{
      const auth = localStorage.getItem('user') // We need to authenticate this 
      if(auth)
      {
        navigate('/')
      }
    })
        const collectData = async ()=>{
            if (validateForm()) {
                console.log("Form submitted", { name, email, password });
                // Add your API call or form submission logic here
            
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
    }
        const validateForm = () => {
            let valid = true;
            let errors = {};
        
            if (!name.trim()) {
              errors.name = "Name is required.";
              valid = false;
            }
        
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.trim()) {
              errors.email = "Email is required.";
              valid = false;
            } else if (!emailPattern.test(email)) {
              errors.email = "Invalid email format.";
              valid = false;
            }
        
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!password) {
              errors.password = "Password is required.";
              valid = false;
            } else if (!passwordPattern.test(password)) {
              errors.password =
                "Password must be at least 6 characters, include an uppercase letter, a lowercase letter, and a number.";
              valid = false;
            }
        
            setErrors(errors);
            return valid;
          };
   
          return (
            <div className="Signup">
              <h1>Signup Page</h1>
        
              <input
                className="inputBox"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
              />
              {errors.name && <span className="error">{errors.name}</span>}
        
              <input
                className="inputBox"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
              />
              {errors.email && <span className="error">{errors.email}</span>}
        
              <input
                className="inputBox"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
              />
              {errors.password && <span className="error">{errors.password}</span>}
        
              <button onClick={collectData} className="signupButton" type="button">
                Sign Up
              </button>
            </div>
          );
}

export default Signup