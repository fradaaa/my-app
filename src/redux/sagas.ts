import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { PostT } from "../types";
import { requestFail, requestPosts, setPosts } from "./slices/postsSlice";

const getPosts = async () => {
  const response = await axios.get<PostT[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
};

function* fetchPosts() {
  try {
    const posts: PostT[] = yield call(getPosts);
    yield put(setPosts(posts));
  } catch (e) {
    yield put(requestFail);
  }
}

function* postsSaga() {
  yield takeLatest(requestPosts, fetchPosts);
}

export { postsSaga };
