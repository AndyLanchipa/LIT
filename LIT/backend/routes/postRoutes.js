const express = require("express");
const { createPost, getAllPosts } = require("../controllers/postControllers");
const { protect } = require("../middleware/cookieJwtAuth");

const router = express.Router();

// Route for creating a new post
router.route("/").post(protect, createPost);

// General route for getting posts.
router.route("/").get(protect, getAllPosts);

module.exports = router;
