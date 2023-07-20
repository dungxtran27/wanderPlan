import { useEffect, useState } from "react";
import { Container, Image, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const AccomodationDetail = () => {
  const { cId } = useParams();
  const [a, setAcomo] = useState([]);
  const [transportation, setTransport] = useState([]);
  const [typeAc, setTypeAc] = useState([]);

  useEffect(() => {
    fetch(" http://localhost:9999/Accomodation/" + cId)
      .then((resp) => resp.json())
      .then((data) => {
        setAcomo(data);
      });
  }, [cId]);
  useEffect(() => {
    fetch(" http://localhost:9999/Transportation")
      .then((resp) => resp.json())
      .then((data) => {
        setTransport(data);
      });
  }, []);
  useEffect(() => {
    fetch(" http://localhost:9999/accomoType")
      .then((resp) => resp.json())
      .then((data) => {
        setTypeAc(data);
      });
  }, []);
  const nav = useNavigate();
  const handleDelete = (id) => {
    if (window.confirm("delete???")) {
      fetch("http://localhost:9999/Accomodation/" + id, {
        method: "DELETE",
      })
        .then(() => {
          alert("delete success");
          nav("/Accomodation");
          // window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  const currId = sessionStorage.getItem("currId");
  return (
    <Container>
      <Row>
        <div className="col-md-6">
          <Image thumbnail src={a.img} />
        </div>
        <div className="col-md-6">
          <h1>
            Name: {a.name}
            {currId == 1 ? (
              <span>
                {" "}
                <button className="btn btn-success">
                  <Link
                    className="text-white"
                    to={"/Accomodation/edit/" + a.id}
                  >
                    edit
                  </Link>
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="btn btn-danger"
                >
                  delete
                </button>
              </span>
            ) : (
              ""
            )}
          </h1>

          <h4>
            Type:
            {typeAc.map((ta) => (ta.id === a.type ? ta.name : ""))}
          </h4>
          <h4>Price: {a.price}</h4>
          <h4>Transport available:</h4>
          <ul>
            {transportation.map((t) =>
              t.cId === a.id ? (
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

export default AccomodationDetail;
