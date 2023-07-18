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
  // useEffect(() => {
  //   fetch(" http://localhost:9999/User")
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setUser(data);
  //     });
  // }, [currId]);
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
  console.log(sessionStorage.getItem("currId"));
  console.log(sessionStorage.getItem("currName"));
  console.log(sessionStorage.getItem("currRole"));
  console.log(sessionStorage.getItem("currAvt"));
  console.log(sessionStorage.getItem("currEmail"));
  console.log(sessionStorage.getItem("currPhone"));
  console.log(sessionStorage.getItem("currAddress"));
  console.log(sessionStorage.getItem("currDob"));
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
        <Row>
          <Col className="col-md-4">
            <Image src={currAvt} roundedCircle style={{ height: "100px" }} />
            <h1>{currName}</h1>

            {currRole == 1 ? (
              <button onClick={logout}>
                <Link className="text-white" to="/User">
                  Management
                </Link>
              </button>
            ) : (
              ""
            )}
          </Col>
          <Col className="col-md-8">
            <h2>Email: {currEmail}</h2>
            <h2>Address: {currAddress}</h2>
            <h2>Phone Number: {currPhone}</h2>
            <h2>Date of birth{currDob}</h2>

            <button onClick={logout} className="btn btn-danger">
              <Link className="text-white" to="/">
                Logout
              </Link>
            </button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Profile;
