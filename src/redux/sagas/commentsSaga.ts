import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { CommentT } from "../../types";
import {
  requestPostComments,
  requestPostCommentsFail,
  setPostComments,
} from "../slices/mainSlice";

const getPostComments = async (action: PayloadAction<number>) => {
  const response = await axios.get<CommentT[]>(
    `https://jsonplaceholder.typicode.com/posts/${action.payload}/comments`
  );
  return response.data;
};

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

function* commentsSaga() {
  yield takeLatest(requestPostComments, fetchPostComments);
}

export default commentsSaga;
