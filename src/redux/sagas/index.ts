import postsSaga from "./postsSaga";
import commentsSaga from "./commentsSaga";
import userSaga from "./userSaga";
import { all } from "redux-saga/effects";

function* rootSaga() {
  yield all([postsSaga(), commentsSaga(), userSaga()]);
}

export { rootSaga };
