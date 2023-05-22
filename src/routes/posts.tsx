import { useEffect } from "react";
import { Col } from "react-bootstrap";
import { PostItem } from "../components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { requestPosts } from "../redux/slices/postsSlice";

const Posts = () => {
  const { posts, isPostsLoading, isLoadingError } = useAppSelector(
    (state) => state.posts
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(requestPosts());
  }, [dispatch]);

  return (
    <Col className="py-2">
      {isPostsLoading ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : isLoadingError ? (
        <div>{isLoadingError}</div>
      ) : (
        <div className="d-flex flex-column gap-4">
          {posts.map((post) => (
            <PostItem key={post.id} {...post} />
          ))}
        </div>
      )}
    </Col>
  );
};

export default Posts;
