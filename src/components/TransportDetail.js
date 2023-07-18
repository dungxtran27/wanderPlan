import { useEffect, useState } from "react";
import { Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

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
  return (
    <Container>
      <Row>
        <div className="col-6">
          {" "}
          <Image src={t.img} thumbnail />
        </div>
        <div className="col-6">
          <h1>{t.name}</h1>
          <p>{t.type}</p>
          <p>{t.price}</p>
        </div>
      </Row>
    </Container>
  );
};
export default TransportDetail;
