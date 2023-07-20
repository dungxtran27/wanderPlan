import { useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const Book = () => {
  const [userId, setUserId] = useState("");
  const [Destination, setDestin] = useState("");
  const [accomo, setAccomo] = useState("");
  const [transport, seTransport] = useState("");
  const [date, setDate] = useState("");
  const { dId } = useParams();
  setDestin(dId);
  const stats = true;
  const HandleSubmit = (e) => {
    e.preventDefault();
    const rev = { Destination, accomo, transport, date, stats };
    // console.log(product);
    if (accomo.length === 0 || transport.length === 0 || date === 0) {
      alert("Please fill all fields");
    } else {
      fetch("http://localhost:9999/Reservation", {
        method: "POST",
        headers: { "Content-Type": "Application/Json", Charset: "UTF-8" },
        body: JSON.stringify(rev),
      })
        .then(() => {
          alert("book successfully!");
          Navigate("/");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const Navigate = useNavigate();
  return (
    <Container>
      <div>
        <div className="col-lg-12">
          <form className="" onSubmit={HandleSubmit}>
            <div className="card" style={{ margin: "100px auto" }}>
              <div className="card-body">
                <h4>Book</h4>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label style={{ fontWeight: "bold" }}>
                        Phone Number <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        placeholder="123-456-789"
                        value={phone}
                        required
                        onChange={(e) => phoneChange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label style={{ fontWeight: "bold" }}>
                        Accommodation: <span style={{ color: "red" }}>*</span>
                      </label>
                      <select onChange={(e) => setAccomo(e.target.value)}>
                        <option>muahaha muahaha</option>
                        <option>muahaha muahaha</option>
                        <option>muahaha muahaha</option>
                      </select>
                      {/* <input
                        placeholder="123-456-789"
                        value={phone}
                        required
                        onChange={(e) => phoneChange(e.target.value)}
                        className="form-control"
                      ></input> */}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label style={{ fontWeight: "bold" }}>
                        transport: <span style={{ color: "red" }}>*</span>
                      </label>
                      <select onChange={(e) => seTransport(e.target.value)}>
                        <option>muahaha muahaha</option>
                        <option>muahaha muahaha</option>
                        <option>muahaha muahaha</option>
                      </select>
                      {/* <input
                        placeholder="132, My Street, Kingston, New York 12401"
                        required
                        value={address}
                        onChange={(e) => addressChange(e.target.value)}
                        className="form-control"
                      ></input> */}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label style={{ fontWeight: "bold" }}>Date</label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <div style={{ textAlign: "center" }}>
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>{" "}
                  &nbsp;
                  <Link to={"/"} className="btn btn-danger">
                    Back
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Book;
