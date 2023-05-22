import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import { CommentT, PostT, UserT } from "../types";
import {
  requestPostComments,
  requestPostCommentsFail,
  requestPosts,
  requestPostsFail,
  requestUser,
  requestUserFail,
  setPostComments,
  setPosts,
  setUserData,
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

const getUserData = async (action: PayloadAction<number>) => {
  const response = await Promise.allSettled([
    axios.get<UserT>(
      `https://jsonplaceholder.typicode.com/users/${action.payload}`
    ),
    axios.get<PostT[]>(
      `https://jsonplaceholder.typicode.com/users/${action.payload}/posts`
    ),
  ]);
  const [user, userPosts] = response.map((res) =>
    res.status === "fulfilled" ? res.value.data : []
  );
  return [user, userPosts];
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

function* fetchUserData(action: any) {
  try {
    yield delay(500);
    const [user, userPosts]: (UserT | PostT[])[] = yield call(
      getUserData,
      action
    );
    yield put(
      setUserData({ user: user as UserT, userPosts: userPosts as PostT[] })
    );
  } catch (e) {
    yield put(requestUserFail(e as string));
  }
}

function* postsSaga() {
  yield takeLatest(requestPosts, fetchPosts);
}

function* commentsSaga() {
  yield takeLatest(requestPostComments, fetchPostComments);
}

function* userSaga() {
  yield takeLatest(requestUser, fetchUserData);
}

function* rootSaga() {
  yield all([postsSaga(), commentsSaga(), userSaga()]);
}

export { rootSaga };
