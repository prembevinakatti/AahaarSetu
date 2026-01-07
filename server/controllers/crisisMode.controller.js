const crisisModeModel = require("../models/crisisMode.model");

module.exports.activateCrisisMode = async (req, res) => {
  try {
    const admin = req.admin;
    const { location, reason } = req.body;

    if (!admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!location || !reason) {
      return res
        .status(400)
        .json({ message: "Location and reason are required" });
    }

    const crisis = await crisisModeModel.findOne();
    if (!crisis) {
      crisis = new crisisModeModel();
    }

    if (crisis.isActive) {
      return res.status(400).json({ message: "Crisis mode is already active" });
    }

    crisis.isActive = true;
    crisis.location = location;
    crisis.reason = reason || "Emergency situation";
    crisis.activatedBy = admin;
    await crisis.save();

    res.status(200).json({
      message: "Crisis mode activated successfully",
      success: true,
      crisis,
    });
  } catch (error) {
    console.error("Error activating crisis mode:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.deactivateCrisisMode = async (req, res) => {
  try {
    const { admin } = req.admin;

    if (!admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const crisis = await crisisModeModel.findOne({ activatedBy: admin });

    if (!crisis || !crisis.isActive) {
      return res.status(400).json({ message: "Crisis mode is not active" });
    }
    crisis.isActive = false;
    crisis.deactivateAt = new Date();
    await crisis.save();

    return res.status(200).json({
      message: "Crisis mode deactivated successfully",
      success: true,
      crisis,
    });
  } catch (error) {
    console.error("Error deactivating crisis mode:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getCrisisModeStatus = async (req, res) => {
  try {
    const admin = req.admin;

    if (!admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const crisis = await crisisModeModel.findOne({ activatedBy: admin });

    if (!crisis) {
      return res.status(404).json({ message: "No crisis mode record found" });
    }

    return res.status(200).json({
      message: "Crisis mode status fetched successfully",
      success: true,
      crisis: crisis,
    });
  } catch (error) {
    console.error("Error fetching crisis mode status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
