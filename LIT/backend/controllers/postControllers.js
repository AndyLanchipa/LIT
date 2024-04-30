const asyncHandler = require("express-async-handler");

const Posts = require("../models/post");

const createPost = asyncHandler(async (req, res) => {
  try {
    const { creator, content } = req.body;
    const likes = 0;
    const retweet = 0;

    // Input validation
    if (!creator || !content) {
      return res
        .status(400)
        .json({ message: "Creator and content are required." });
    }

    // Add any other validation as per your requirements
    // For example, checking the type of likes, retweet, etc.

    const post = new Posts({
      creator,
      likes,
      retweet,
      content,
    });

    const savedPost = await post.save();

    // Prepare response data, omitting sensitive information if any
    const responseData = {
      id: savedPost._id,
      creator: savedPost.creator,
      likes: savedPost.likes,
      retweet: savedPost.retweet,
      content: savedPost.content,
    };

    res.status(201).json(responseData);
  } catch (error) {
    // Detailed error handling
    if (error.name === "ValidationError") {
      // Handle validation error from Mongoose, for example
      return res.status(400).json({ message: error.message });
    }
    // Log the error for debugging purpose
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const getAllPosts = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filters
    const filter = {};
    if (req.query.userId) {
      filter.creator = req.query.userId;
    }

    // Sorting options
    const sort = { createdAt: -1 }; // Sorting by creation date in descending order

    const posts = await Posts.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select("-sensitiveField") // Exclude sensitive fields
      .populate("creator", "name"); // Populate the 'creator' field with the 'name' from the User collection

    res.status(200).json({ page, limit, data: posts });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
});




const likePost  = asyncHandler(async(req,res)=>{

})

module.exports = {
  getAllPosts,
  createPost,
};
