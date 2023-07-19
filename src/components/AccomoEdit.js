import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

const AccomoEdit = () => {
  const { cId } = useParams();
  const [accommodation, setAccommodation] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9999/Accomodation/" + cId)
      .then((resp) => resp.json())
      .then((data) => {
        setAccommodation(data);
      });
  }, [cId]);

  const handleChange = (e) => {
    setAccommodation({ ...accommodation, [e.target.name]: e.target.value });
  };
  const updatedAcco = {
    ...accommodation,
    type: parseInt(accommodation.type),
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:9999/Accomodation/" + cId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedAcco),
    })
      .then(() => {
        alert("Update successful");
        navigate("/Accomodation");
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
            value={accommodation.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="type">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            name="type"
            value={accommodation.type}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={accommodation.price}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="img">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            name="img"
            value={accommodation.img}
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

export default AccomoEdit;
