import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { PostItem } from "../components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { requestPosts } from "../redux/slices/postsSlice";

const Posts = () => {
  const { posts, error, pending } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(requestPosts());
  }, [dispatch]);

  return (
    <Container className="py-2">
      {pending ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
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