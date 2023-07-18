import { useEffect, useState } from "react";
import { Container, Image, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

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
  return (
    <Container>
      <Row>
        <div className="col-md-6">
          <Image thumbnail src={a.img} />
        </div>
        <div className="col-md-6">
          <h1>Name: {a.name}</h1>

          <h4>
            Type:
            {typeAc.map((ta) => (ta.id === a.type ? ta.name : ""))}
          </h4>
          <h4>Price: {a.price}</h4>
          <h4>transport</h4>
          <ul>
            {transportation.map((t) =>
              t.dId === a.id ? (
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
