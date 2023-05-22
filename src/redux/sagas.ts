import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import { CommentT, PostT } from "../types";
import {
  requestPostComments,
  requestPostCommentsFail,
  requestPosts,
  requestPostsFail,
  setPostComments,
  setPosts,
} from "./slices/postsSlice";

const getPosts = async () => {
  const response = await axios.get<PostT[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
};

const getPostComments = async (action: PayloadAction<number>) => {
  const response = await axios.get<CommentT[]>(
    `https://jsonplaceholder.typicode.com/posts/${action.payload}/comments`
  );
  return response.data;
};

function* fetchPosts() {
  try {
    yield delay(500);
    const posts: PostT[] = yield call(getPosts);
    yield put(setPosts(posts));
  } catch (e) {
    yield put(requestPostsFail);
  }
}

function* fetchPostComments(action: any) {
  try {
    yield delay(500);
    const comments: CommentT[] = yield call(getPostComments, action);
    yield put(setPostComments({ data: comments, postId: action.payload }));
  } catch (e) {
    yield put(
      requestPostCommentsFail({ error: e as string, postId: action.payload })
    );
  }
}

function* postsSaga() {
  yield takeLatest(requestPosts, fetchPosts);
}

function* commentsSaga() {
  yield takeLatest(requestPostComments, fetchPostComments);
}

function* rootSaga() {
  yield all([postsSaga(), commentsSaga()]);
}

export { rootSaga };
