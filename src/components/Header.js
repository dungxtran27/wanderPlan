import { Link } from "react-router-dom";
import "../styles/Default.css";
import Login from "./Login";
import Popup from "reactjs-popup";
import { useEffect, useState } from "react";
import { Person } from "react-bootstrap-icons";

export default function Header() {
  const [currId, setCurrId] = useState(null);

  useEffect(() => {
    setCurrId(sessionStorage.getItem("currId"));
  }, [sessionStorage.getItem("currId")]);

  return (
    <div id="header">
      <div className="logo-section">
        <Link to="/">
          <img src="/img/bleisure.png" alt="Logo" style={{ height: "70px" }} />
        </Link>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/Destination">Destination</Link>
        <Link to="/about">Planning</Link>
        <Link to="/Accomodation">Accomodation</Link>
        <Link to="/Transportation">Transport</Link>
      </nav>
      <div className="auth-links">
        {currId == null ? (
          <span>
            {" "}
            <Link to="/register">Register</Link>
            <Link to="/login">
              <button className="loginbtn">Login</button>
            </Link>
          </span>
        ) : (
          <Link to="/profile">
            <Person style={{ width: "50px", height: "30px" }}></Person>
          </Link>
        )}
      </div>
    </div>
  );
}
