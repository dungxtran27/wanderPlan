import { useEffect, useState } from "react";
import { Container, Image, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const TransportDetail = () => {
  const { tId } = useParams();
  const [t, setTrasport] = useState([]);

  useEffect(() => {
    fetch(" http://localhost:9999/Transportation/" + tId)
      .then((resp) => resp.json())
      .then((data) => {
        setTrasport(data);
      });
  }, [tId]);
  const nav = useNavigate();
  const handleDelete = (id) => {
    if (window.confirm("delete???")) {
      fetch("http://localhost:9999/Transportation/" + id, {
        method: "DELETE",
      })
        .then(() => {
          alert("delete success");
          nav("/Transportation");
          //   window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  const currId = sessionStorage.getItem("currId");
  console.log(currId);
  return (
    <Container>
      <Row>
        <div className="col-6">
          {" "}
          <Image src={t.img} thumbnail />
        </div>
        <div className="col-6">
          <h1>
            Name: {t.name}
            {currId == 1 ? (
              <span>
                <button className="btn btn-success">
                  <Link
                    className="text-white"
                    to={"/Transportation/edit/" + t.id}
                  >
                    edit
                  </Link>
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="btn btn-danger"
                >
                  delete
                </button>
              </span>
            ) : (
              ""
            )}
          </h1>
          <p>Type: {t.type}</p>
          <p>Price: {t.price}</p>
        </div>
      </Row>
    </Container>
  );
};
export default TransportDetail;
