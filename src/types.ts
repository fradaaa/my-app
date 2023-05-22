export type PostT = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export type CommentT = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
