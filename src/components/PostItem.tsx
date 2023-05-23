import { useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { CommentT, PostT } from "../types";
import CommentItem from "./CommentItem";
import { requestPostComments } from "../redux/slices/mainSlice";

type PostP = PostT & {
  comments: CommentT[];
  isCommentsLoading: boolean;
  isCommentsError: null | string;
};

const PostItem = ({
  body,
  title,
  userId,
  id: postId,
  comments,
  isCommentsLoading,
  isCommentsError,
}: PostP) => {
  const dispatch = useAppDispatch();
  const [showComments, setShowComments] = useState(false);

  const loadComments = () => {
    if (isCommentsLoading) return;

    if (showComments) {
      setShowComments(false);
    } else {
      dispatch(requestPostComments(postId));
      setShowComments(true);
    }
  };

  return (
    <Container className="border p-4 rounded">
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
      <Container className="d-flex flex-column align-items-center border-top pt-2 mt-2">
        <Button onClick={loadComments}>Comments</Button>
        {isCommentsLoading ? (
          <div className="d-flex justify-content-center align-items-center h-100 my-5">
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        ) : isCommentsError ? (
          <div>{isCommentsError}</div>
        ) : (
          showComments && (
            <div className="d-flex flex-column gap-4">
              {comments.map(({ email, body, id: commentId }) => (
                <CommentItem key={commentId} email={email} body={body} />
              ))}
            </div>
          )
        )}
      </Container>
    </Container>
  );
};

export default PostItem;
