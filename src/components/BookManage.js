import { useEffect, useState } from "react";
import { Container, Row, Table } from "react-bootstrap";

const BookManage = () => {
  const [user, setUser] = useState([]);
  const [destin, setDestin] = useState([]);
  const [accomo, setAccomo] = useState([]);
  const [transport, setTransport] = useState([]);
  const [reservation, setReservation] = useState([]);
  useEffect(() => {
    fetch(" http://localhost:9999/User")
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data);
      });
  }, []);
  useEffect(() => {
    fetch(" http://localhost:9999/Destination")
      .then((resp) => resp.json())
      .then((data) => {
        setDestin(data);
      });
  }, []);
  useEffect(() => {
    fetch(" http://localhost:9999/Accomodation")
      .then((resp) => resp.json())
      .then((data) => {
        setAccomo(data);
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
  const handleApprove = (id) => {
    fetch(`http://localhost:9999/Reservation/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "Application/Json", Charset: "UTF-8" },
      body: JSON.stringify({ status: true }),
    })
      .then(() => {
        // Update reservation in state
        setReservation((prevReservations) =>
          prevReservations.map((r) =>
            r.id === id ? { ...r, status: true } : r
          )
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <Container>
      <Row>
        <h1>Booking List:</h1>
      </Row>
      <Row>filter</Row>
      <Row>
        <Table>
          <thead>
            <th>id</th>
            <th>user</th>
            <th>Destination</th>
            <th>Accomodation</th>
            <th>Transportation</th>
            <th>Date</th>
            <th>status</th>
            <th>action</th>
          </thead>
          <tbody>
            {reservation.map((r) => (
              <tr>
                <td>{r.id}</td>
                <td>{user.map((u) => (r.uId === u.id ? u.name : ""))}</td>
                <td>{destin.map((d) => (d.id === r.dId ? d.name : ""))}</td>
                <td>{accomo.map((c) => (c.id === r.cId ? c.name : ""))}</td>
                <td>{transport.map((t) => (t.id === r.tId ? t.name : ""))}</td>
                <td>{r.date}</td>
                <td>
                  {r.status === true ? (
                    <p style={{ color: "green" }}>approved</p>
                  ) : (
                    <p style={{ color: "red" }}>not approved</p>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleApprove(r.id)}
                  >
                    approved
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default BookManage;
