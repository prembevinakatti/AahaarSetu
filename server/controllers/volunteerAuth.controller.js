const volunteerAuthModel = require("../models/volunteerAuth.model");

module.exports.registerVolunteer = async (req, res) => {
  try {
    const { username, email, phoneNumber, password } = req.body;

    if (!username || !email || !phoneNumber || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingVolunteer = await volunteerAuthModel.findOne({ email });
    if (existingVolunteer) {
      return res
        .status(400)
        .json({ message: "Volunteer with this email already exists" });
    }

    const newVolunteer = await volunteerAuthModel.create({
      username,
      email,
      phoneNumber,
      password,
    });

    if (!newVolunteer) {
      return res.status(500).json({ message: "Failed to register volunteer" });
    }

    const volunteerToken = jwt.sign(
      { id: newVolunteer._id },
      process.env.VOLUNTEER_JWT_TOKEN
    );

    res.cookie("volunteerToken", volunteerToken);

    return res.status(201).json({
      message: "Volunteer registered successfully",
      success: true,
      volunteer: newVolunteer,
    });
  } catch (error) {
    console.log("Error registering volunteer:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.loginVolunteer = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const volunteer = await volunteerAuthModel.findOne(email);
    if (!volunteer) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, volunteer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: newVolunteer._id },
      process.env.VOLUNTEER_JWT_TOKEN
    );

    res.cookie("volunteerToken", token);

    return res.status(200).json({
      message: "Volunteer logged in successfully",
      success: true,
      volunteer: volunteer,
    });
  } catch (error) {
    console.log("Error logging in volunteer:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.logoutVolunteer = async (req, res) => {
  try {
    res.clearCookie("volunteerToken");
    return res.status(200).json({
      message: "Volunteer logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error logging out volunteer:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
