const verifyModel = require("../models/verify.model");
const volunteerProfileModel = require("../models/volunteerProfile.model");

module.exports.requestVerification = async (req, res) => {
  try {
    const volunteer = req.volunteer;
    const adminId = req.params.adminId;

    if (!volunteer) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Volunteer not authenticated" });
    }

    if (!adminId) {
      return res.status(400).json({ message: "Admin ID is required" });
    }

    const existingRequest = await verifyModel.findOne({ volunteer, adminId });
    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "Verification request already sent" });
    }

    const newRequest = await verifyModel.create({
      volunteerId: volunteer,
      adminId,
    });

    if (!newRequest) {
      return res
        .status(500)
        .json({ message: "Failed to create verification request" });
    }

    return res.status(201).json({
      message: "Verification request sent successfully",
      success: true,
      request: newRequest,
    });
  } catch (error) {
    console.error("Error requesting verification:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.AcceptOrRejectVerification = async (req, res) => {
  try {
    const adminId = req.adminId;
    const { volunteerId, action } = req.body;

    if (!adminId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Admin not authenticated" });
    }

    if (!volunteerId || !action) {
      return res
        .status(400)
        .json({ message: "Volunteer ID and action are required" });
    }

    const request = await verifyModel.findOne({
      volunteerId,
      adminId,
      status: "PENDING",
    });

    if (!request) {
      return res
        .status(404)
        .json({ message: "Verification request not found" });
    }

    if (action === "APPROVED") {
      request.status = "APPROVED";
      await request.save();

      const volunteer = await volunteerProfileModel.findOne({
        volunteer: volunteerId,
      });
      if (!volunteer) {
        return res.status(404).json({ message: "Volunteer not found" });
      }
      volunteer.associatedOrganization = adminId;
      volunteer.isVerified = true;
      await volunteer.save();

      return res.status(200).json({
        message: "Verification request accepted successfully",
        success: true,
        request: request,
      });
    } else if (action === "REJECTED") {
      request.status = "REJECTED";
      await request.save();

      return res.status(200).json({
        message: "Verification request rejected successfully",
        success: true,
        request: request,
      });
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }
  } catch (error) {
    console.error("Error in AcceptOrRejectVerification:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getVerificationRequests = async (req, res) => {
  try {
    const adminId = req.adminId;

    if (!adminId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Admin not authenticated" });
    }

    const requests = await verifyModel
      .find({ adminId, status: "PENDING" })
      .populate("volunteerId")
      .populate("adminId");

    if (!requests) {
      return res
        .status(404)
        .json({ message: "No verification requests found" });
    }

    return res.status(200).json({
      message: "Verification requests fetched successfully",
      success: true,
      requests: requests,
    });
  } catch (error) {
    console.error("Error fetching verification requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getAllVerifications = async (req, res) => {
  try {
    const adminId = req.adminId;

    if (!adminId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Admin not authenticated" });
    }

    const verifications = await verifyModel
      .find({ adminId })
      .populate("volunteerId")
      .populate("adminId");

    if (!verifications) {
      return res.status(404).json({ message: "No verifications found" });
    }

    return res.status(200).json({
      message: "All verifications fetched successfully",
      success: true,
      verifications: verifications,
    });
  } catch (error) {
    console.error("Error fetching all verifications:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
