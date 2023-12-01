import { User } from "./user";

export type PostType = {
  content: string;
  likes: number;
  retweet: number;
  creator: User;
};
