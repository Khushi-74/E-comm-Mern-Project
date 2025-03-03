import React, { use } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });
  const collectData = async () => {
    console.warn(name, email, password);
    let response = await fetch("http://localhost:5000/signup", {
      method: "Post",
      body: JSON.stringify({ name, email, password }), //bina json ke data ni leta
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await response.json();
    if (response.status === 400) {
      alert(result.message);
    } else {
      console.warn(result);
      localStorage.setItem("user", JSON.stringify(result.user)); //browser ke local storage me store krna //browser close hone pe bhi data rhega
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    }
  };

  return (
    <div className="Signup">
      <h1>signup page</h1>
      <input
        className="inputBox"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      ></input>
      <input
        className="inputBox"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      ></input>
      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      ></input>
      <button onClick={collectData} className="signupButton" type="button">
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
