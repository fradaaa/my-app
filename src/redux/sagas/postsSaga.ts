import axios from "axios";
import { PostT } from "../../types";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { requestPosts, requestPostsFail, setPosts } from "../slices/mainSlice";

const getPosts = async () => {
  const response = await axios.get<PostT[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
};

function* fetchPosts() {
  try {
    yield delay(500);
    const posts: PostT[] = yield call(getPosts);
    yield put(setPosts(posts));
  } catch (e) {
    yield put(requestPostsFail(e as string));
  }
}

function* postsSaga() {
  yield takeLatest(requestPosts, fetchPosts);
}

export default postsSaga;
