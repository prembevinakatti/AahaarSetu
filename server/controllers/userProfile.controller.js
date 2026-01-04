const userProfileModel = require("../models/userProfile.model");
const generateUserId = require("../utils/generateUserId");

module.exports.createUserProfile = async (req, res) => {
  try {
    const { age, contact, gender, location } = req.body;
    const userId = req.userId;
    if (!age || !contact || !gender || !location) {
      return res.status(404).json({ message: "All fields are required" });
    }

    if (!userId) {
      return res
        .status(404)
        .json({ message: "Unauthorised:User Id not found" });
    }

    const existingUser = await userProfileModel.findOne({ userId });

    if (existingUser) {
      return res.status(404).json({ message: "User already exists" });
    }

    const userGeneratedId = await generateUserId();

    const newUserProfile = await userProfileModel.create({
      age,
      contact,
      gender,
      location,
      userGeneratedId: userGeneratedId,
    });

    if (!newUserProfile) {
      return res.status(500).json({ message: "Failed to create User Profile" });
    }

    return res.status(201).json({
      message: "User Profile created successfully",
      success: true,
      userProfile: newUserProfile,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in creating user", error: error.message });
  }
};

module.exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(404).json({ message: "Unauthorised User" });
    }

    const userProfile = await userProfileModel.findOne({ userId }).populate();

    if (!userProfile) {
      return res.status(500).json({ message: "User Profile not found" });
    }

    return res.status(201).json({
      message: "USer Profile fetched successfully",
      success: true,
      userProfile: userProfile,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in getting User Profile", error: error.message });
  }
};

module.exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(404).json({ message: "Unauthorised user" });
    }

    const userProfile = await userProfileModel.findOne({ userId });

    if (!userProfile) {
      return res.status(404).json({ message: "USer Profile not found" });
    }

    const updatedUserProfile = await userProfileModel.findByIdAndUpdate(
      userProfile._id
    );
    if (!updatedUserProfile) {
      return res.status(500).json({ message: "Failed to update uer profile" });
    }

    return res
      .status(201)
      .json({
        message: "User Profile Updated sucessfully",
        success: true,
        userProfile: updatedUserProfile,
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Error in updating user profile",
        error: error.message,
      });
  }
};
