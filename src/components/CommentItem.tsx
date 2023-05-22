import { Col } from "react-bootstrap";

type CommentItemP = {
  email: string;
  body: string;
};

const CommentItem = ({ email, body }: CommentItemP) => {
  return (
    <Col>
      <h3>{email}</h3>
      <p>{body}</p>
    </Col>
  );
};

export default CommentItem;
