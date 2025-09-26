import React, { useState, useEffect } from "react";
import "../styles/Signup.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (localStorage.getItem("login")) {
      setTimeout(() => {
        navigate("/");
      }, 0);
    }
  });

  const handleSignUp = async () => {
    console.log(userData);
    let result = await fetch("http://localhost:3200/signup", {
      method: "post",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "Application/json" },
    });
    result = await result.json();
    if (result.success) {
      document.cookie = "token=" + result.token;
      localStorage.setItem("login", userData.email);
      window.dispatchEvent(new Event("localstorage-change"));
      setTimeout(() => {
        navigate("/");
      }, 0);
    } else {
      alert("Try After SomeTime");
    }
  };

  return (
    <div className="container">
      <h2>Create Account</h2>

      <label>Username</label>
      <input
        type="text"
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        name="name"
        required
      />

      <label>Email</label>
      <input
        type="email"
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        name="email"
        required
      />

      <label>Password</label>
      <input
        type="password"
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        name="password"
        required
      />

      <button onClick={handleSignUp} type="submit">
        Sign Up
      </button>
      <p className="login-text">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default SignUp;
