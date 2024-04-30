const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  followUser,
  unfollowUser,
  getUserFollowers,
  getUserFollowing,
} = require("../controllers/userControllers");

const { protect } = require("../middleware/cookieJwtAuth");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/follow/:followingId").post(protect, followUser);
router.route("/:toUnfollowId/unfollow").delete(protect, unfollowUser);
router.route("/followers").get(protect, getUserFollowers);
router.route("/following").get(protect, getUserFollowing);

module.exports = router;
