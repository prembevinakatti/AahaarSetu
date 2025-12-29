const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const volunteerAuth = require("./routes/volunteerAuth.route");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/volunteer/auth", volunteerAuth);
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on PORT ${PORT}`);
});
