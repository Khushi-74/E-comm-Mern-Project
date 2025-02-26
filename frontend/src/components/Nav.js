import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user"); // Remove user data
    localStorage.removeItem("token"); // Remove JWT token
    navigate("/signup"); // Redirect to Signup page
  };

  return (
    <div>
      <img
        alt="logo"
        className="logo"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHMxuqqnkGPEc0_-r1VvKQ4wALmZ3x-ueuUA&s"
      ></img>
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Product</Link>
          </li>
          <li>
            <Link to="/addProduct">Add Product</Link>
          </li>
          <li>
            <Link to="/update:id">Update Product</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            {" "}
            <Link onClick={logout} to="/signup">
              Logout (
              {auth
                ? JSON.parse(auth)?.displayName
                  ? JSON.parse(auth).displayName
                  : JSON.parse(auth).name
                : "User"}
              )
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signInGoogle">signup With Google</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
