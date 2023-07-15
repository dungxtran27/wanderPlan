import React, { useContext, useState } from "react";

export default ({ close }) => {
  const [name, setUsername] = useState("");
  const [pass, setPassword] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  //const { loginUser } = useContext(UserContext);
  //const [errorMessage, setErrorMessage] = useState("");

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
      sessionStorage.setItem("userId", user.id);
      sessionStorage.setItem("userName", user.name);
      loginUser(user.name, user.pass);
      alert("User logged in!");
      // Perform any additional actions, such as updating state or redirecting
    } else {
      // Authentication failed
      alert("Login failed");
      // Handle the error accordingly, e.g., display an error message
    }
    setPassword("");
    setUsername("");
    setError2("");
    setError1("");
  };
  console.log(sessionStorage.getItem("userName"));
  //  const handleLogin = async (e) => {
  //   e.preventDefault();

  //   // Create a request body with the name and password
  //   const requestBody = { name, pass };

  //   try {
  //     const response = await fetch("http://localhost:9999/User", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.ok) {
  //       const users = await response.json();

  //       // Find a user with the provided email and password
  //       const user = users.find((u) => u.name === name && u.pass === pass);

  //       if (user) {
  //         // Store the user ID and email in sessionStorage
  //         sessionStorage.setItem("userId", user.id);
  //         sessionStorage.setItem("userName", user.name);

  //         // Call loginUser function from UserContext
  //         loginUser(user.name, user.pass);
  //       } else {
  //         setErrorMessage("Invalid email or password");
  //       }
  //     } else {
  //       const errorData = await response.json();
  //       setErrorMessage(errorData.message || "Login failed");
  //     }
  //   } catch (error) {
  //     console.error("An error occurred during login", error);
  //     setErrorMessage("An error occurred during login");
  //   }
  // };
  return (
    <div>
      <a className="close" onClick={close}>
        &times;
      </a>
      <div className="d-flex justify-content-center">
        <div className="card" style={{ width: "800px" }}>
          <div className="card-header text-left">
            <h2>Welcome back!</h2>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="card-body">
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
              <div className="text-center">
                {" "}
                <button
                  type="submit"
                  style={{ width: "150px" }}
                  className=" btn btn-success "
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
