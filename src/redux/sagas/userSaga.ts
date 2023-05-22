import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { PostT, UserT } from "../../types";
import { requestUser, requestUserFail, setUserData } from "../slices/mainSlice";

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

function* userSaga() {
  yield takeLatest(requestUser, fetchUserData);
}

export default userSaga;
