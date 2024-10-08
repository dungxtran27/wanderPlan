import { useEffect, useState } from "react";
import { Container, Image, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const DestinationDetail = () => {
  const { dId } = useParams();
  const [d, setDestinationDetail] = useState([]);
  const [accomo, setAcomo] = useState([]);
  const [transportation, setTransport] = useState([]);
  useEffect(() => {
    fetch(" http://localhost:9999/Destination/" + dId)
      .then((resp) => resp.json())
      .then((data) => {
        setDestinationDetail(data);
      });
  }, [dId]);
  useEffect(() => {
    fetch(" http://localhost:9999/Transportation")
      .then((resp) => resp.json())
      .then((data) => {
        setTransport(data);
      });
  }, []);
  useEffect(() => {
    fetch(" http://localhost:9999/Accomodation")
      .then((resp) => resp.json())
      .then((data) => {
        setAcomo(data);
      });
  }, []);
  const nav = useNavigate();
  const handleDelete = (id) => {
    if (window.confirm("delete???")) {
      fetch("http://localhost:9999/Destination/" + id, {
        method: "DELETE",
      })
        .then(() => {
          alert("delete success");
          nav("/Destination");
          //   window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  const currid = sessionStorage.getItem("currId");
  return (
    <Container>
      <Row>
        <div className="col-md-6">
          <Image thumbnail src={d.img} />
        </div>
        <div className="col-md-6">
          <h1>{d.name}</h1>
          {currid == 1 ? (
            <span>
              <button className="btn btn-success">
                <Link className="text-white" to={"/Destination/edit/" + dId}>
                  edit
                </Link>
              </button>
              <button
                onClick={() => handleDelete(d.id)}
                className="btn btn-danger"
              >
                delete
              </button>
            </span>
          ) : (
            ""
          )}
          <p>{d.description}</p>
        </div>
      </Row>

      <Row>
        <div className="col-6">
          <h4>accomodation</h4>
          <ul>
            {accomo.map((a) =>
              a.dId === d.id ? (
                <li>
                  <Link to={"/Accomodation/detail/" + a.id}>{a.name}</Link>
                </li>
              ) : (
                ""
              )
            )}
          </ul>
        </div>
        <div className="col-6">
          <h4>transport</h4>
          <ul>
            {transportation.map((t) =>
              t.dId === d.id ? (
                <li>
                  <Link to={"/Transportation/detail/" + t.id}>{t.name}</Link>
                </li>
              ) : (
                ""
              )
            )}
          </ul>
        </div>
      </Row>
    </Container>
  );
};

export default DestinationDetail;
