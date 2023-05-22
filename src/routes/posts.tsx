import { useEffect } from "react";
import { Container } from "react-bootstrap";
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
    <Container className="py-2">
      {isPostsLoading ? (
        <div>Loading...</div>
      ) : isLoadingError ? (
        <div>{isLoadingError}</div>
      ) : (
        <div className="d-flex flex-column gap-4">
          {posts.map((post) => (
            <PostItem key={post.id} {...post} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default Posts;
