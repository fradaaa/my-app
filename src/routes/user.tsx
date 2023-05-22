import { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { PostItem } from "../components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { requestUser } from "../redux/slices/postsSlice";
import { IoArrowBackSharp } from "react-icons/io5";

const User = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user, posts, isUserLoading, isLoadingError } = useAppSelector(
    (state) => state.posts
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(requestUser(userId as string));
  }, [dispatch, userId]);

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <div className="position-relative">
      {isUserLoading ? (
        <div className="d-flex justify-content-center align-items-center h-100 my-5">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : isLoadingError ? (
        <div>{isLoadingError}</div>
      ) : (
        user && (
          <div className="d-flex flex-column gap-4">
            <Container>
              <h1>Name: {user.name}</h1>
              <h2>Email: {user.email}</h2>
              <h2>Username: {user.username}</h2>
              <h2>Phone: {user.phone}</h2>
            </Container>
            {posts.map((post) => (
              <PostItem key={post.id} {...post} />
            ))}
            <Button
              onClick={goToHomePage}
              className="position-fixed top-0 end-0 translate-middle"
              style={{ marginTop: "50px", marginRight: "-10px" }}
            >
              <IoArrowBackSharp />
            </Button>
          </div>
        )
      )}
    </div>
  );
};

export default User;
