import { useEffect, useState } from "react";
import { Card, Container, Image, Row } from "react-bootstrap";
import "../styles/Default.css";
import { Link } from "react-router-dom";
const Accomodation = () => {
  const [accomo, setAccomo] = useState([]);
  const [typeAc, setTypeAc] = useState([]);
  const [searchAccomo, setSearchAccomo] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const [sortOrder, setSortOrder] = useState([]);
  useEffect(() => {
    fetch(" http://localhost:9999/Accomodation")
      .then((resp) => resp.json())
      .then((data) => {
        setAccomo(data);
      });
  }, []);
  useEffect(() => {
    fetch(" http://localhost:9999/accomoType")
      .then((resp) => resp.json())
      .then((data) => {
        setTypeAc(data);
      });
  }, []);
  const filter = accomo.filter((t) => {
    if (filterType != 0) {
      return (
        t.type == filterType && t.name.toLowerCase().includes(searchAccomo)
      );
    } else {
      return t.name.toLowerCase().includes(searchAccomo);
    }
  });
  const handleTypeFilter = (event) => {
    setFilterType(event.target.value);
    //  console.log(filterType);
  };
  const handleSort = () => {
    const sortedAccomo = [...accomo];

    sortedAccomo.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setAccomo(sortedAccomo);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const handleSearch = (event) => {
    setSearchAccomo(event.target.value.toLowerCase());
  };
  return (
    <Container>
      <Row>
        <h1>Accomodation List</h1>
      </Row>
      <Row>
        <input
          type="text"
          id="transport"
          placeholder="search by name"
          className="form-control"
          value={searchAccomo}
          onChange={handleSearch}
          //   pattern="[a-zA-Z0-9]{5,}"
        />
        <select onChange={handleTypeFilter}>
          <option value={0}>all</option>
          {typeAc.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={handleSort}>
          sort price
        </button>
      </Row>
      <Row>
        {filter.map((a) => (
          <Card className=" col-4" border="info">
            <Card.Title>
              <Link to={"/Accomodation/detail/" + a.id}>{a.name}</Link>
            </Card.Title>
            <Card.Body>
              <Image src={a.img} thumbnail />
              <Card.Text>
                Type:
                {typeAc.map((ta) => (ta.id === a.type ? ta.name : ""))}
              </Card.Text>
              <Card.Text>
                Price:
                {a.price}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default Accomodation;
