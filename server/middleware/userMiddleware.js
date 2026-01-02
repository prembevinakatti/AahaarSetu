const jwt = require("jsonwebtoken");

const isUserAuthenticated = async (req, res) => {
  try {
    const userToken = req.cookies.userToken;

    if (!userToken) {
      return res.status(404).json({ message: "Token not found" });
    }

    const decodedtoken = await jwt.verify(token, process.env.USER_JWT_TOKEN);

    if (!decodedtoken) {
      return res.status(404).json({ message: "Unauthorised token" });
    }

    req.userId = decodedtoken.userId;
    next();

  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error in Middleware", error: error.message });
  }
};

module.exports = isUserAuthenticated;
