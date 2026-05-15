export interface User {
  id: number;
  name: string;
  email: string;
  gender?: string;
  status?: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  user_id?: number;
}

export interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
  post_id: number;
}
