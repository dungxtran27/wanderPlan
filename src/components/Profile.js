import { useEffect, useState } from "react";
import { Container, Image, Col, Row } from "react-bootstrap";
import Login from "./Login";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
const Profile = () => {
  const currId = sessionStorage.getItem("currId");
  const currName = sessionStorage.getItem("currName");
  const currAvt = sessionStorage.getItem("currAvt");
  const currAddress = sessionStorage.getItem("currAddress");
  const currEmail = sessionStorage.getItem("currEmail");
  const currRole = sessionStorage.getItem("currRole");
  const currPhone = sessionStorage.getItem("currPhone");
  const currDob = sessionStorage.getItem("currDob");

  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch(" http://localhost:9999/User/" + currId)
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data);
      });
  }, [currId]);
  const logout = () => {
    sessionStorage.removeItem("currId");
    sessionStorage.removeItem("currName");
    sessionStorage.removeItem("currRole");
    sessionStorage.removeItem("currRole");
    sessionStorage.removeItem("currAvt");
    sessionStorage.removeItem("currEmail");
    sessionStorage.removeItem("currAddress");
    sessionStorage.removeItem("currDob");
    sessionStorage.removeItem("currPhone");
  };
  return (
    <Container>
      {currRole == null ? (
        <div className="text-center" style={{ margin: "200px auto" }}>
          <Image
            src="https://ih1.redbubble.net/image.29689845.8231/flat,1000x1000,075,f.jpg"
            roundedCircle
            style={{ height: "100px" }}
          />
          <h1 className="text-center">you must login to view profile</h1>
        </div>
      ) : (
        <Row style={{ margin: "100px auto" }}>
          <Col className="col-md-4">
            <Image
              src={user.avatar}
              roundedCircle
              style={{ height: "100px" }}
            />
            <h1>{user.name}</h1>

            {currRole == 1 ? (
              <button className="btn btn-primary" onClick={logout}>
                <Link className="text-white" to="/User">
                  Management
                </Link>
              </button>
            ) : (
              ""
            )}
          </Col>
          <Col className="col-md-8">
            <h2>Email: {user.email}</h2>
            <h2>Address: {user.address}</h2>
            <h2>Phone Number: {user.phone}</h2>
            <h2>Date of birth: {user.dob}</h2>

            <button
              onClick={logout}
              style={{ marginRight: "20px" }}
              className="btn btn-danger"
            >
              <Link className="text-white" to="/">
                Logout
              </Link>
            </button>
            <button className="btn btn-warning">
              <Link className="text-white" to="/changepass">
                change password
              </Link>
            </button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Profile;
