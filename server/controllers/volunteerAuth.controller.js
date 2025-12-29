const volunteerAuthModel = require("../models/volunteerAuth.model");

module.exports.registerVolunteer = async (req, res) => {
  try {
    const { username, email, phoneNumber, password } = req.body;

    if (!username || !email || !phoneNumber || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingVolunteer = await volunteerAuthModel.findOne({ email });
    if (esistingVolunteer) {
      return res
        .status(400)
        .json({ message: "Volunteer with this email already exists" });
    }
  } catch (error) {
    console.log("Error registering volunteer:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
