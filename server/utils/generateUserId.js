const userProfileModel = require("../models/userProfile.model");

const generateUserId = async () => {
  let userGeneratedId;
  let exists = true;

  while (exists) {
    const randomNumber = Math.floor(100 + Math.random() * 900);

    userGeneratedId = `USER${randomNumber}`;

    const existing = await userProfileModel.findOne({ userGeneratedId });

    exists = existing !== null;
  }

  return userGeneratedId;
};

module.exports = generateUserId;
