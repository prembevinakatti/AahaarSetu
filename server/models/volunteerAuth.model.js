const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const volunteerAuthSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

volunteerAuthSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hash = await bcrypt.has(this.password, 10);
  this.password = hash;
  next();
});

module.exports = mongoose.model("VolunteerAuth", volunteerAuthSchema);
