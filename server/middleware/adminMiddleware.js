const jwt = require("jsonwebtoken");

const isAdminAuthenticated = async (req, res) => {
  try {
    const adminToken = req.cookies.adminToken;

    if (!adminToken) {
      return res.status(404).json({ message: "Token not found" });
    }

    const decodedtoken = await jwt.verify(
      adminToken,
      process.env.ADMIN_JWT_TOKEN
    );
    if (!decodedtoken) {
      return res.status(404).json({ message: "Unauthorised token" });
    }

    req.adminId = decodedtoken.adminId;
    next();
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error in Middleware", error: error.message });
  }
};

module.exports = isAdminAuthenticated;
