"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const PostsDb = require("../models/post");
router.get("/getPosts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield PostsDb.find();
    res.status(200).json(posts);
}));
router.post("/createPost", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { creator, likes, retweet, content } = req.body;
    const post = new PostsDb({
        creator,
        likes,
        retweet,
        content,
    });
    const savedPost = yield post.save();
    console.log(savedPost);
    res.status(200).json(savedPost);
}));
router.post("/updatePost", (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
router.post("deletePost", (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
exports.default = router;
