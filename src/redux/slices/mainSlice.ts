import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CommentT, PostT, UserT } from "../../types";

type State = {
  user: UserT | null;
  posts: (PostT & {
    comments: CommentT[];
    isCommentsLoading: boolean;
    isCommentsError: null | string;
  })[];
  isPostsLoading: boolean;
  isUserLoading: boolean;
  isLoadingError: null | string;
};

const initialState: State = {
  user: null,
  posts: [],
  isPostsLoading: false,
  isUserLoading: false,
  isLoadingError: null,
};

const convertPosts = (posts: PostT[]) =>
  posts.map(({ body, title, ...rest }) => ({
    ...rest,
    body: body[0].toUpperCase() + body.substring(1),
    title: title[0].toUpperCase() + title.substring(1),
    comments: [],
    isCommentsError: null,
    isCommentsLoading: false,
  }));

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    requestPosts: (state) => {
      state.isPostsLoading = true;
      state.isLoadingError = null;
    },
    setPosts: (state, action: PayloadAction<PostT[]>) => {
      state.posts = convertPosts(action.payload);
      state.isPostsLoading = false;
      state.isLoadingError = null;
    },
    requestPostsFail: (state, action: PayloadAction<string>) => {
      state.isLoadingError = action.payload;
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
    requestUser: (state, action: PayloadAction<string>) => {
      state.isUserLoading = true;
      state.isLoadingError = null;
    },
    setUserData: (
      state,
      action: PayloadAction<{ user: UserT; userPosts: PostT[] }>
    ) => {
      const { user, userPosts } = action.payload;
      state.user = user;
      state.posts = convertPosts(userPosts);
      state.isUserLoading = false;
      state.isLoadingError = null;
    },
    requestUserFail: (state, action: PayloadAction<string>) => {
      state.isLoadingError = action.payload;
      state.isUserLoading = false;
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
  requestUser,
  setUserData,
  requestUserFail,
} = mainSlice.actions;

export default mainSlice.reducer;
