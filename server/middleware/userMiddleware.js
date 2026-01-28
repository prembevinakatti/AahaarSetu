const jwt = require("jsonwebtoken");

const isUserAuthenticated = async (req, res, next) => {
  try {
    const userToken = req.cookies.userToken;

    if (!userToken) {
      return res.status(404).json({ message: "Token not found" });
    }

    const decoded = jwt.verify(userToken, process.env.USER_JWT_TOKEN);

    if (!decoded) {
      return res.status(404).json({ message: "Invalid token" });
    }

    req.userId = decoded.userId;
    next();

  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error in Middleware", error: error.message });
  }
};

module.exports = isUserAuthenticated;
