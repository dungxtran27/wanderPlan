import { useCallback } from "react";
import { useEffect, useState } from "react";
import {
  Col,
  Container,
  Image,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";

import { Link, useParams } from "react-router-dom";

const PostDetail = () => {
  const { pId } = useParams();
  const [p, setPost] = useState([]);
  const [prov, setProv] = useState([]);
  const [Destination, setDestin] = useState([]);
  const [review, setReview] = useState([]);
  const [cmt, setCmt] = useState("");
  const [user, setUser] = useState([]);
  const currId = sessionStorage.getItem("currId");
  useEffect(() => {
    fetch(" http://localhost:9999/Post/" + pId)
      .then((resp) => resp.json())
      .then((data) => {
        setPost(data);
      });
  }, [pId]);
  useEffect(() => {
    fetch(" http://localhost:9999/postReview/")
      .then((resp) => resp.json())
      .then((data) => {
        setReview(data);
      });
  }, [review]);
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
  useEffect(() => {
    fetch(" http://localhost:9999/User")
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  const HandleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const rev = {
        uId: currId,
        postId: pId,
        comments: cmt,
      };
      if (cmt.length == 0) {
        alert("comment must not empty");
      } else {
        fetch("http://localhost:9999/postReview", {
          method: "POST",
          headers: { "Content-Type": "Application/Json", Charset: "UTF-8" },
          body: JSON.stringify(rev),
        })
          .then(() => {
            alert("sent successfully!");
            setCmt("");
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    },
    [review]
  );
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
      <h1 style={{ display: "block" }}>Comments:</h1>
      <br />
      {review.map((rv) =>
        rv.postId == pId ? (
          <p style={{ display: "block" }}>
            {user.map((u) =>
              u.id == rv.uId ? (
                <p>
                  <i>{u.name}</i> said:
                </p>
              ) : (
                ""
              )
            )}
            {rv.comments}
          </p>
        ) : (
          ""
        )
      )}
      <form style={{ width: "100%" }} onSubmit={HandleSubmit}>
        <div className="col-lg-6">
          <div className="form-group">
            <label style={{ fontWeight: "bold" }}>
              leave your review: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              placeholder="Input your comments here"
              //required
              //  value={review}
              onChange={(e) => setCmt(e.target.value)}
              className="form-control"
            ></input>
            <span>
              <button type="submit" className="btn btn-primary">
                send
              </button>
            </span>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default PostDetail;
