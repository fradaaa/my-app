import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PostT } from "../../types";

type State = {
  posts: PostT[];
  pending: boolean;
  error: null | string;
};

const initialState: State = {
  posts: [],
  pending: false,
  error: null,
};

export const postsSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    requestPosts: (state) => {
      state.pending = true;
      state.error = null;
    },
    setPosts: (state, action: PayloadAction<PostT[]>) => {
      state.posts = action.payload.map(({ body, title, ...rest }) => ({
        ...rest,
        body: body[0].toUpperCase() + body.substring(1),
        title: title[0].toUpperCase() + title.substring(1),
      }));
      state.pending = false;
      state.error = null;
    },
    requestFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.pending = false;
    },
  },
});

export const { requestPosts, setPosts, requestFail } = postsSlice.actions;

export default postsSlice.reducer;
