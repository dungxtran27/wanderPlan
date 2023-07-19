import { useEffect, useState } from "react";
import { Container, Image, Col, Row, Table } from "react-bootstrap";
import Login from "./Login";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
const Profile = () => {
  const currId = sessionStorage.getItem("currId");

  const currRole = sessionStorage.getItem("currRole");

  const [accommodation, setAccommodation] = useState([]);
  const [destination, setDestin] = useState([]);
  const [Transportation, setTransport] = useState([]);
  const [reservation, setReservation] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch(" http://localhost:9999/User/" + currId)
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data);
      });
  }, [currId]);
  useEffect(() => {
    fetch("http://localhost:9999/Accomodation")
      .then((resp) => resp.json())
      .then((data) => {
        setAccommodation(data);
      });
  }, []);
  useEffect(() => {
    fetch(" http://localhost:9999/Transportation")
      .then((resp) => resp.json())
      .then((data) => {
        setTransport(data);
      });
  }, []);
  useEffect(() => {
    fetch(" http://localhost:9999/Reservation")
      .then((resp) => resp.json())
      .then((data) => {
        setReservation(data);
      });
  }, []);
  useEffect(() => {
    fetch(" http://localhost:9999/Destination")
      .then((resp) => resp.json())
      .then((data) => {
        setDestin(data);
      });
  }, []);
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
    window.location.reload();
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
            <h3>Email: {user.email}</h3>
            <h3>Address: {user.address}</h3>
            <h3>Phone Number: {user.phone}</h3>
            <h3>Date of birth: {user.dob}</h3>
            <h3>My reservation: </h3>
            <Table>
              <thead>
                <th>destination</th>
                <th>accommodation</th>
                <th>Transportation</th>
                <th>date</th>
              </thead>
              <tbody>
                {reservation.map((r) =>
                  r.uId == currId ? (
                    <tr>
                      <td>
                        {destination.map((d) => (r.dId == d.id ? d.name : ""))}
                      </td>
                      <td>
                        {accommodation.map((a) =>
                          r.cId == a.id ? a.name : ""
                        )}
                      </td>
                      <td>
                        {Transportation.map((t) =>
                          r.tId == t.id ? t.name : ""
                        )}
                      </td>
                      <td>{r.date}</td>
                    </tr>
                  ) : (
                    ""
                  )
                )}
              </tbody>
            </Table>
            <button
              onClick={logout}
              style={{ marginRight: "20px" }}
              className="btn btn-danger"
            >
              Logout
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
