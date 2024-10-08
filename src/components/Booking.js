import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const Book = () => {
  const [userId, setUserId] = useState("");
  const [accomoType, setAccoType] = useState("1");

  const [accomoTypes, setAccoTypes] = useState([]);
  const [accomo, setAcco] = useState("");
  const [accomos, setAccos] = useState([]);

  const [transport, setTransport] = useState("1");
  const [transports, setTransports] = useState([]);
  const [transportType, setTransportType] = useState("1");
  const [transportTypes, setTransportTypes] = useState([]);
  const [date, setDate] = useState("");
  const { dId } = useParams();
  //setDestin(dId);
  const stats = false;
  const currId = sessionStorage.getItem("currId");

  const Destination = dId;
  useEffect(() => {
    fetch(" http://localhost:9999/type")
      .then((resp) => resp.json())
      .then((data) => {
        setTransportTypes(data);
      });
  }, [transportType]);

  const HandleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const rev = {
        uId: parseInt(currId),
        dId: parseInt(dId),
        cId: parseInt(accomo),
        tId: parseInt(transport),
        date,
        stats,
      };
      if (accomoType.length == 0 || transportType.length == 0 || date == 0) {
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
    },
    [accomo, transportType, date]
  );
  useEffect(() => {
    fetch(" http://localhost:9999/accomoType")
      .then((resp) => resp.json())
      .then((data) => {
        setAccoTypes(data);
      });
  }, [accomoType]);
  useEffect(() => {
    fetch(" http://localhost:9999/Accomodation")
      .then((resp) => resp.json())
      .then((data) => {
        setAccos(data);
      });
  }, [accomo]);
  useEffect(() => {
    fetch(" http://localhost:9999/Transportation")
      .then((resp) => resp.json())
      .then((data) => {
        setTransports(data);
      });
  }, [transport]);
  // const handleAcco = (e) => {
  //   setAccoType(e.target.value, () => {
  //     setAccoType(e.target.value);
  //   });
  //   console.log(accomoType);
  // };
  const handleAcco = (e) => {
    setAcco(e.target.value);
    console.log(accomo);
  };

  const handleTransport = (e) => {
    setTransport(e.target.value);
    console.log(transport);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
    console.log(date);
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
                        Accommodation: <span style={{ color: "red" }}>*</span>
                      </label>
                      <select onChange={handleAcco}>
                        {accomos.map((a) =>
                          a.dId === parseInt(dId) ? (
                            <option value={a.id}>
                              {a.dId === parseInt(dId) ? a.name : ""}
                            </option>
                          ) : (
                            ""
                          )
                        )}
                      </select>
                      {/* <select onChange={handleAcco}>
                        {accomoTypes.map((a) => (
                          <option value={a.id}>{a.name}</option>
                        ))}
                      </select> */}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label style={{ fontWeight: "bold" }}>
                        transport: <span style={{ color: "red" }}>*</span>
                      </label>
                      <select onChange={handleTransport}>
                        {transports.map((t) =>
                          t.dId === parseInt(dId) ? (
                            <option value={t.id}>{t.name}</option>
                          ) : (
                            ""
                          )
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label style={{ fontWeight: "bold" }}>Date</label>
                      <input
                        type="date"
                        value={date}
                        onChange={handleDate}
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
