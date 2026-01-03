const volunteerProfileModel = require("../models/volunteerProfile.model");
const generateVolunteerId = require("../utils/generateVolunteerId");

module.exports.createVolunteerProfile = async (req, res) => {
  try {
    const { currentArea, availabilityStatus, associatedOrganization } =
      req.body;
    const volunteer = req.volunteer;

    if (!currentArea || !availabilityStatus || !associatedOrganization) {
      return res
        .status(400)
        .json({ message: "Current area and availability status are required" });
    }

    if (!volunteer) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Volunteer not authenticated" });
    }

    const existingVolunteer = await volunteerProfileModel.findOne({
      volunteer,
    });
    if (existingVolunteer) {
      return res
        .status(400)
        .json({ message: "Volunteer profile already exists" });
    }

    const volunteerId = await generateVolunteerId();

    const newVolunteerProfile = await volunteerProfileModel.create({
      volunteer,
      currentArea,
      availabilityStatus,
      associatedOrganization,
      volunteerId: volunteerId,
    });

    if (!newVolunteerProfile) {
      return res
        .status(500)
        .json({ message: "Failed to create volunteer profile" });
    }

    return res.status(201).json({
      message: "Volunteer profile created successfully",
      success: true,
      volunteerProfile: newVolunteerProfile,
    });
  } catch (error) {
    console.error("Error creating volunteer profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

