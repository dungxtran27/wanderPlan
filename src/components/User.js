import { useEffect, useState } from "react";
import { Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [roleFilter, setRoleFilter] = useState(0);
  useEffect(() => {
    fetch(" http://localhost:9999/User")
      .then((resp) => resp.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("delete???")) {
      fetch("http://localhost:9999/User/" + id, {
        method: "DELETE",
      })
        .then(() => {
          alert("delete success");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  return (
    <Container>
      <Row>
        <h1>User List:</h1>
      </Row>
      <Row>filter</Row>
      <Row>
        <Table className="table table-hover table-striped">
          <thead className="thead thead-dark">
            <th className="col-1">id</th>
            <th className="col-1">role</th>
            <th className="col-2">name</th>
            <th className="col-2">email</th>
            <th className="col-3">address</th>
            <th className="col-2">phone</th>
            <th className="col-1">Action</th>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.role}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.address}</td>
                <td>{u.phone}</td>
                <td colSpan={2}>
                  <button style={{ width: "68px" }} className="btn btn-success">
                    <Link className="text-white" to={"/User/edit/" + u.id}>
                      edit
                    </Link>
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="btn btn-danger"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default User;
