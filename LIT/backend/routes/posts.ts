import { Post } from "../types/post";

const express = require("express");
const router = express.Router();
const PostsDb = require("../models/post");

router.get("/getPosts", async (req: any, res: any) => {
  const posts = await PostsDb.find();

  res.status(200).json(posts);
});

router.post("/createPost", async (req: any, res: any) => {
  const { creator, likes, retweet, content }: Post = req.body;

  const post = new PostsDb({
    creator,
    likes,
    retweet,
    content,
  });

  const savedPost = await post.save();
  console.log(savedPost);

  res.status(200).json(savedPost);
});

router.post("/updatePost", async (req: any, res: any) => {});

router.post("deletePost", async (req: any, res: any) => {});

export default router;
