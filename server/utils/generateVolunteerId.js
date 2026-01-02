const volunteerProfileModel = require("../models/volunteerProfile.model");

const generateVolunteerId = async () => {
  let volunteerId;
  let exists = true;

  while (exists) {
    const randomNumber = Math.floor(100 + Math.random() * 900);
    volunteerId = `VOL${randomNumber}`;

    const existing = await volunteerProfileModel.findOne({ volunteerId });
    exists = existing !== null;
  }

  return volunteerId;
};

module.exports = generateVolunteerId;
