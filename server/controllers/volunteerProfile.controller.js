const volunteerProfileModel = require("../models/volunteerProfile.model");
const generateVolunteerId = require("../utils/generateVolunteerId");

module.exports.createVolunteerProfile = async (req, res) => {
  try {
    const { currentArea, associatedOrganization } = req.body;
    const volunteer = req.volunteer;

    if (!currentArea || !associatedOrganization) {
      return res.status(400).json({
        message: "Current area and associated organization are required",
      });
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

module.exports.getVolunteerProfile = async (req, res) => {
  try {
    const volunteer = req.volunteer;

    if (!volunteer) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Volunteer not authenticated" });
    }

    const volunteerProfile = await volunteerProfileModel
      .findOne({ volunteer })
      .populate();

    if (!volunteerProfile) {
      return res.status(404).json({ message: "Volunteer profile not found" });
    }

    return res.status(200).json({
      message: "Volunteer profile fetched successfully",
      success: true,
      volunteerProfile: volunteerProfile,
    });
  } catch (error) {
    console.error("Error fetching volunteer profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.updateStatus = async (req, res) => {
  try {
    const { availabilityStatus } = req.body;
    const volunteer = req.volunteer;

    if (!volunteer) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Volunteer not authenticated" });
    }

    if (!availabilityStatus) {
      return res
        .status(400)
        .json({ message: "Availability status is required" });
    }

    const volunteerProfile = await volunteerProfileModel
      .findOne({ volunteer })
      .populate();

    if (!volunteerProfile) {
      return res.status(404).json({ message: "Volunteer profile not found" });
    }

    const updatedVolunteerProfile =
      await volunteerProfileModel.findByIdAndUpdate(
        volunteerProfile._id,
        { availabilityStatus },
        { new: true }
      );

    if (!updatedVolunteerProfile) {
      return res.status(500).json({ message: "Failed to update status" });
    }

    return res.status(200).json({
      message: "Volunteer profile status updated successfully",
      success: true,
      volunteerProfile: updatedVolunteerProfile,
    });
  } catch (error) {
    console.error("Error updating volunteer profile status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
