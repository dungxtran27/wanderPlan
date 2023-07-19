import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

const DestinEdit = () => {
  const { dId } = useParams();
  const [destination, setDestination] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9999/Destination/" + dId)
      .then((resp) => resp.json())
      .then((data) => {
        setDestination(data);
      });
  }, [dId]);

  const handleChange = (e) => {
    setDestination({ ...destination, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:9999/Destination/" + dId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(destination),
    })
      .then(() => {
        alert("Update successful");
        navigate("/Destination");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Container>
      {" "}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={destination.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="img">
          <Form.Label>image</Form.Label>
          <Form.Control
            type="text"
            name="img"
            value={destination.img}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="description"
            value={destination.description}
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

export default DestinEdit;
