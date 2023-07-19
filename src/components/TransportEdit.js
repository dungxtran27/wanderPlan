import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row } from "react-bootstrap";

const TransportEdit = () => {
  const { tId } = useParams();
  const [transport, setTransport] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9999/Transportation/" + tId)
      .then((resp) => resp.json())
      .then((data) => {
        setTransport(data);
      });
  }, [tId]);

  const handleChange = (e) => {
    setTransport({ ...transport, [e.target.name]: e.target.value });
  };
  const updatedTransport = {
    ...transport,
    type: parseInt(transport.type),
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:9999/Transportation/" + tId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTransport),
    })
      .then(() => {
        alert("Update successful");
        navigate("/Transportation");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={transport.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="type">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="number"
            name="type"
            max={5}
            min={1}
            value={transport.type}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={transport.price}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="img">
          <Form.Label>image link</Form.Label>
          <Form.Control
            type="text"
            name="img"
            placeholder="paste image link here"
            value={transport.img}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default TransportEdit;
