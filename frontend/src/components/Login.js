import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup } from "./Firebase";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const handleGoogleLogin = async () => {
    try {
      let result = await signInWithPopup(auth, provider);
      //get user from google
      const user = result.user;
      //send this data to backend
      let response = await fetch("http://localhost:5000/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: user.accessToken }),
      });

      if (!response.ok) {
        throw new Error("Google login failed");
      }
      response = await response.json();
      //set token and user on local storage
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/");
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  const handleLogin = async () => {
    console.warn(email, password);
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    console.warn(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      console.warn("please eneter correct details");
    }
  };
  return (
    <div className="login">
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Email "
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Password "
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={handleLogin} className="signupButton" type="button">
        Login
      </button>
      <div>OR</div>
      <button
        onClick={handleGoogleLogin}
        className="signupButton"
        type="button"
      >
        Login with Google
      </button>
    </div>
  );
};
export default Login;
