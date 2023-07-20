import { useEffect, useState } from "react";
import {
  Col,
  Container,
  Image,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { pId } = useParams();
  const [p, setPost] = useState([]);
  const [prov, setProv] = useState([]);
  const [Destination, setDestin] = useState([]);

  useEffect(() => {
    fetch(" http://localhost:9999/Post/" + pId)
      .then((resp) => resp.json())
      .then((data) => {
        setPost(data);
      });
  }, [pId]);

  useEffect(() => {
    fetch(" http://localhost:9999/Destination")
      .then((resp) => resp.json())
      .then((data) => {
        setDestin(data);
      });
  }, []);
  useEffect(() => {
    fetch(" http://localhost:9999/Provider")
      .then((resp) => resp.json())
      .then((data) => {
        setProv(data);
      });
  }, []);

  return (
    <Container>
      <h1>{p.name}</h1>
      <Row>
        <Col className="col-md-6">
          <Image style={{ width: "100%" }} src={p.postImg} />
        </Col>
        <Col className="col-md-6">
          <h4>{Destination.map((d) => (p.id === d.id ? d.name : ""))}</h4>
          <h4>{p.content}</h4>
          <hr />
          <h4>Price: {p.price}</h4>
          <hr />
          <h4>
            Provider:{" "}
            {prov.map((pv) =>
              p.provId === pv.id ? (
                <>
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip id="tooltip-right">
                        <div>{pv.sponsor}</div>
                        <div>Phone: {pv.phone}</div>
                        <div> {pv.email}</div>
                      </Tooltip>
                    }
                  >
                    <span>{pv.name}</span>
                  </OverlayTrigger>
                </>
              ) : (
                ""
              )
            )}
          </h4>
        </Col>
      </Row>
    </Container>
  );
};

export default PostDetail;
