const express = require("express");
const isUserAuthenticated = require("../middleware/userMiddleware");
const {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userProfile.controller");

const router = express.Router();
router.route("/createUserProfile").post(isUserAuthenticated, createUserProfile);
router.route("/getUserProfile").get(isUserAuthenticated, getUserProfile);
router.route("/updateUserProfile").put(isUserAuthenticated, updateUserProfile);

module.exports = router;
