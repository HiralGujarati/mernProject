import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("login")) {
      setTimeout(() => {
        navigate("/");
      }, 0);
    }
  });
  const handleLogin = async () => {
    console.log(userData);
    let result = await fetch("http://localhost:3200/login", {
      method: "Post",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.success) {
      document.cookie = "token=" + result.token;
      localStorage.setItem("login", userData.email);
      window.dispatchEvent(new Event("localstorage-change"));
      navigate("/");
    } else {
      alert("First Signup");
    }
  };
  return (
    <div className="container">
      <h2>Login</h2>

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

      <button onClick={handleLogin} type="submit">
        Login
      </button>
      <p className="login-text">
        You have not account? <a href="/signup">Signup</a>
      </p>
    </div>
  );
};

export default Login;
