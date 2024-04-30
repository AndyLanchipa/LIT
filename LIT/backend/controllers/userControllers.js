const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const mongoose = require("mongoose");
const Following = require("../models/following");
const generateToken = require("../config/generateToken");
const Followers = require("../models/followers");

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic, username } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    name,
    email,
    password,
    pic,
  });
  console.log(user);

  if (user) {
    // Set the token as an HTTP cookie with secure and httpOnly flags
    const tempToken = generateToken(user._id);
    console.log(tempToken);
    res.cookie("token", tempToken, {
      maxAge: 3 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    const tempToken = generateToken(user._id);

    res.cookie("token", tempToken, {
      maxAge: 3 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
      pic: user.pic,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Username or Password");
  }
});
//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});
////////////////////////              Following functionality       //////////////////////////////

/**
 * @description follow user
 * @route POST /api/user/follow/:followingId
 * @access Protected
 */

const followUser = asyncHandler(async (req, res) => {
  try {
    const toFollowId = new mongoose.Types.ObjectId(req.params.followingId);
    const { userId } = req.body;

    // Check if both users exist
    const userExists = await User.findById(userId);
    const toFollowUserExists = await User.findById(toFollowId);

    if (!userExists || !toFollowUserExists) {
      return res.status(404).json({ message: "User not found." });
    }

    // Prevent self-follow
    if (userId.toString() === toFollowId.toString()) {
      return res.status(400).json({ message: "Cannot follow yourself." });
    }

    // Check for existing follow relationship
    const existingFollowing = await Following.findOne({
      userId,
      following_id: toFollowId,
    });
    if (existingFollowing) {
      return res.status(400).json({ message: "Already following this user." });
    }

    // Create a new follow relationship
    const following = new Following({
      user_id: userId,
      following_id: toFollowId,
    });
    await following.save();

    //since we follow we need to create a new follower document for the new following

    await new Followers({
      user_id: toFollowId,
      follower_id: userId,
    }).save();

    //  fetch and return the followed user's information
    const followedUserInfo = await User.findById(toFollowId).select(
      "-password"
    );

    res.status(200).json(followedUserInfo);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error following user", error: error.message });
  }
});

/**
 * @description unfollow user
 * @route DELETE /api/user/:userId/unfollow
 * @access Protected
 */

const unfollowUser = asyncHandler(async (req, res) => {
  const toUnfollowId = new mongoose.Types.ObjectId(req.params.toUnfollowId);
  const userId = new mongoose.Types.ObjectId(req.body.userId);

  /**
   * checking if the users exists in the case of account deletion
   */
  const users = await User.find({
    _id: { $in: [userId, toUnfollowId] },
  });

  if (!users) return res.status(404).json({ message: "User not found." });

  //check if user is not following themselves

  if (userId === toUnfollowId)
    return res.status(400).json({ message: "cannot unfollow yourself" });

  //unfollow action
  // Find and delete the follow relationship
  console.log(userId);
  console.log(toUnfollowId);
  const unfollowResult = await Following.findOneAndDelete({
    user_id: userId,
    following_id: toUnfollowId,
  });

  await Followers.findOneAndDelete({
    user_id: toUnfollowId,
    follower_id: userId,
  });

  if (!unfollowResult) {
    return res.status(404).json({ message: "Follow relationship not found." });
  }

  res.status(200).json({ message: "Unfollowed successfully" });
});
/**
 * @description get user follower list
 * @route GET /api/user/:userId/followers
 */
const getUserFollowers = asyncHandler(async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.body.userId);
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 10;

  const skipAmount = (page - 1) * pageSize;

  const followerList = await Followers.aggregate([
    { $match: { user_id: userId } },
    {
      $lookup: {
        from: "users",
        localField: "follower_id",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    { $unwind: "$userDetails" },
    {
      $facet: {
        metadata: [{ $count: "totalCount" }],
        data: [
          { $skip: skipAmount },
          { $limit: pageSize },
          { $replaceRoot: { newRoot: "$userDetails" } },
        ],
      },
    },
  ]);
  const metadata = followerList.length > 0 ? followerList[0].metadata : [];
  const data = followerList.length > 0 ? followerList[0].data : [];

  res.status(200).json({
    total: metadata[0] ? metadata[0].totalCount : 0,
    pages: metadata[0] ? Math.ceil(metadata[0].totalCount / pageSize) : 0,
    currentPage: page,
    data,
  });
});

/**
 * @description get user following list
 * @route GET /api/user/:userId/following
 * @access Protected
 */
const getUserFollowing = asyncHandler(async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.body.userId); // Convert to ObjectId
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
    const skipAmount = (page - 1) * pageSize;

    const followingList = await Following.aggregate([
      { $match: { user_id: userId } },
      {
        $lookup: {
          from: "users",
          localField: "following_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $facet: {
          metadata: [{ $count: "totalCount" }],
          data: [
            { $skip: skipAmount },
            { $limit: pageSize },
            { $replaceRoot: { newRoot: "$userDetails" } },
          ],
        },
      },
    ]);

    const metadata = followingList.length > 0 ? followingList[0].metadata : [];
    const data = followingList.length > 0 ? followingList[0].data : [];

    res.status(200).json({
      total: metadata[0] ? metadata[0].totalCount : 0,
      pages: metadata[0] ? Math.ceil(metadata[0].totalCount / pageSize) : 0,
      currentPage: page,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get following list" });
  }
});

module.exports = {
  registerUser,
  authUser,
  allUsers,
  getUserFollowing,
  followUser,
  getUserFollowers,
  unfollowUser,
};
