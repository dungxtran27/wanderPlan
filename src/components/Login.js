import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default ({ close }) => {
  const [name, setUsername] = useState("");
  const [pass, setPassword] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  //const { loginUser } = useContext(UserContext);
  //const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const loginUser = (userName, id) => {
    setUsername(userName);
    setUserId(id);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "") {
      setError("");
      setError1("Please enter a value for username ");
    } else if (pass === "") {
      setError1("");
      setError2("Please enter a value for password");
    }

    const response = await fetch("http://localhost:9999/User", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const users = await response.json();

    const user = users.find((u) => u.name === name && u.pass === pass);

    if (user) {
      // User authenticated successfully
      sessionStorage.setItem("currId", user.id);
      sessionStorage.setItem("currName", user.name);
      sessionStorage.setItem("currRole", user.role);
      sessionStorage.setItem("currAvt", user.avatar);
      sessionStorage.setItem("currEmail", user.email);
      sessionStorage.setItem("currPhone", user.phone);
      sessionStorage.setItem("currAddress", user.address);
      sessionStorage.setItem("currDob", user.dob);
      loginUser(user.name, user.pass);
      //toast.success("User logged in!");
      alert("User logged in!");
      console.log(sessionStorage.getItem("currId"));
      console.log(sessionStorage.getItem("currName"));
      console.log(sessionStorage.getItem("currRole"));
      console.log(sessionStorage.getItem("currAvt"));
      console.log(sessionStorage.getItem("currEmail"));
      console.log(sessionStorage.getItem("currPhone"));
      console.log(sessionStorage.getItem("currAddress"));
      console.log(sessionStorage.getItem("currDob"));
      nav("/");
      window.location.reload();
      // Perform any additional actions, such as updating state or redirecting
    } else {
      // Authentication failed
      // toast.error("Login failed");
      alert("Login failed");

      // Handle the error accordingly, e.g., display an error message
    }

    setPassword("");
    setUsername("");
    setError2("");
    setError1("");
  };
  //console.log(sessionStorage.getItem("userName"));
  const nav = useNavigate();
  return (
    <div style={{ margin: "100px auto" }}>
      <div className="d-flex justify-content-center">
        <div className="card" style={{ width: "800px" }}>
          <div className="card-header text-left">
            <h2>Welcome back!</h2>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="card-body" style={{ height: "30px" }}>
            <form onSubmit={handleSubmit}>
              <div className="form-group text-left">
                <label htmlFor="username">
                  Username<span style={{ color: "red" }}>*</span>
                </label>
                {error1 && <div className="alert alert-danger">{error1}</div>}

                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={name}
                  onChange={handleUsernameChange}
                  //   pattern="[a-zA-Z0-9]{5,}"
                />
              </div>
              <div className="form-group text-left">
                <label htmlFor="password">
                  Password<span style={{ color: "red" }}>*</span>
                </label>
                {error2 && <div className="alert alert-danger">{error2}</div>}

                <input
                  type="password"
                  id="pass"
                  className="form-control"
                  value={pass}
                  onChange={handlePasswordChange}
                  // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                />
              </div>

              <button type="submit" className="btn btn-success ">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
