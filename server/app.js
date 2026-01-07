const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const userAuth = require("./routes/userAuth.routes");
const adminAuth = require("./routes/adminAuth.route");
const volunteerAuth = require("./routes/volunteerAuth.route");
const volunteerProfile = require("./routes/volunteerProfile.route");
const verifyRoute = require("./routes/verify.route");
const foodRoute = require("./routes/foodPoint.route");
const userProfile = require("./routes/userProfile.route");
const crisisModeRoute = require("./routes/crisisMode.route");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user/auth", userAuth);
app.use("/api/user/admin", adminAuth);
app.use("/api/volunteer/auth", volunteerAuth);
app.use("/api/volunteer/profile", volunteerProfile);
app.use("/api/admin/verify", verifyRoute);
app.use("/api/volunteer/verify", foodRoute);
app.use("/api/user/profile", userProfile);
app.use("/api/admin/crisisMode", crisisModeRoute);

app.use(cookieParser());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on PORT ${PORT}`);
});
