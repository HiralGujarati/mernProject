import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import "../styles/navbar.css";
import { useState } from "react";
import { useEffect } from "react";

const Navbar = () => {
  const [login, setLogin] = useState(localStorage.getItem("login"));
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("login");
    setLogin(null);
    setTimeout(() => {
      navigate("/login");
    }, 0);
  };

  useEffect(() => {
    const handleStorage = () => {
      setLogin(localStorage.getItem("login"));
    };
    window.addEventListener("localstorage-change", handleStorage);
    return () => {
      window.removeEventListener("localstorage-change", handleStorage);
    };
  }, []);
  return (
    <>
      <nav className="navbar">
        <div className="logo">ToDoApp</div>
        <ul className="navLinks">
          {login ? (
            <>
              <li>
                <Link to="/">List</Link>
              </li>
              <li>
                <Link to="/addtask">Add</Link>{" "}
              </li>
              <li>
                <Link onClick={logOut}>Logout</Link>{" "}
              </li>
            </>
          ) : null}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
