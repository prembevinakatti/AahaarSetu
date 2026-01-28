const adminAuthModel = require("../models/adminAuth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.registerAdmin = async (req, res) => {
  try {
    const { username, email, orgName, orgNumber, location, password } =
      req.body;

    console.log(req.body);

    if (
      !username ||
      !email ||
      !orgName ||
      !orgNumber ||
      !location ||
      !password
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAdmin = await adminAuthModel.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this email already exists" });
    }

    const isOrgNumberMatched = orgNumber === process.env.ADMIN_ORG_NUMBER;
    if (!isOrgNumberMatched) {
      return res
        .status(400)
        .json({ message: "Organization number is incorrect" });
    }

    const newAdmin = await adminAuthModel.create({
      username,
      email,
      orgName,
      orgNumber,
      location,
      password,
    });

    if (!newAdmin) {
      return res.status(500).json({ message: "Unable to register admin" });
    }

    const adminToken = jwt.sign(
      { adminId: newAdmin._id },
      process.env.ADMIN_JWT_TOKEN,
    );
    res.cookie("token", adminToken);

    return res.status(201).json({
      message: "Admin registered successfully",
      success: true,
      admin: newAdmin,
    });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const admin = await adminAuthModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Password does not match" });
    }

    const adminToken = jwt.sign(
      { userId: admin._id },
      process.env.ADMIN_JWT_TOKEN,
    );
    res.cookie("token", adminToken);

    return res.status(201).json({
      message: "Admin login successfully",
      success: true,
      admin: admin,
    });
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ message: "Server error" });
  }
};
