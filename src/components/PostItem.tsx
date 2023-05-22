import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PostT } from "../types";

const PostItem = ({ body, title, userId }: PostT) => {
  return (
    <Container className="d-flex flex-column align-items-center border p-4 rounded">
      <Row>
        <Col className="flex-grow-2">
          <h2>{title}</h2>
          <p>{body}</p>
        </Col>
        <Col className="d-flex flex-column flex-grow-0 align-items-center">
          <p>Author</p>
          <Link to={`/user/${userId}`}>
            <Image
              src="https://cdn.7tv.app/emote/6306876cbe8c19d70f9d6b22/4x.webp"
              width={64}
              height={64}
              roundedCircle
            />
          </Link>
        </Col>
      </Row>
      <Button>Comments</Button>
    </Container>
  );
};

export default PostItem;
