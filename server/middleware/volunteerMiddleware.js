const jwt = require("jsonwebtoken");

const isVolunteerAuthenticated = async (req, res, next) => {
  try {
    const volunteerToken = req.cookies.volunteerToken;

    if (!volunteerToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decodedToken = jwt.verify(
      volunteerToken,
      process.env.VOLUNTEER_JWT_TOKEN
    );

    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.volunteer = decodedToken.id;
    next();
  } catch (error) {
    console.error("Error in volunteer authentication middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = isVolunteerAuthenticated;
