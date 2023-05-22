import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CommentT, PostT } from "../../types";

type State = {
  posts: (PostT & {
    comments: CommentT[];
    isCommentsLoading: boolean;
    isCommentsError: null | string;
  })[];
  isPostsLoading: boolean;
  isPostsError: null | string;
};

const initialState: State = {
  posts: [],
  isPostsLoading: false,
  isPostsError: null,
};

export const postsSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    requestPosts: (state) => {
      state.isPostsLoading = true;
      state.isPostsError = null;
    },
    setPosts: (state, action: PayloadAction<PostT[]>) => {
      state.posts = action.payload.map(({ body, title, ...rest }) => ({
        ...rest,
        body: body[0].toUpperCase() + body.substring(1),
        title: title[0].toUpperCase() + title.substring(1),
        comments: [],
        isCommentsError: null,
        isCommentsLoading: false,
      }));
      state.isPostsLoading = false;
      state.isPostsError = null;
    },
    requestPostsFail: (state, action: PayloadAction<string>) => {
      state.isPostsError = action.payload;
      state.isPostsLoading = false;
    },
    requestPostComments: (state, action: PayloadAction<number>) => {
      const newPosts = state.posts.map((post) =>
        post.id === action.payload
          ? {
              ...post,
              isCommentsLoading: true,
              isCommentsError: null,
            }
          : post
      );
      state.posts = newPosts;
    },
    setPostComments: (
      state,
      action: PayloadAction<{ data: CommentT[]; postId: number }>
    ) => {
      const { data, postId } = action.payload;
      const newPosts = state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: data,
              isCommentsLoading: false,
              isCommentsError: null,
            }
          : post
      );
      state.posts = newPosts;
    },
    requestPostCommentsFail: (
      state,
      action: PayloadAction<{ error: string; postId: number }>
    ) => {
      const { error, postId } = action.payload;
      const newPosts = state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isCommentsLoading: false,
              isCommentsError: error,
            }
          : post
      );
      state.posts = newPosts;
    },
  },
});

export const {
  requestPosts,
  setPosts,
  requestPostsFail,
  requestPostComments,
  setPostComments,
  requestPostCommentsFail,
} = postsSlice.actions;

export default postsSlice.reducer;
