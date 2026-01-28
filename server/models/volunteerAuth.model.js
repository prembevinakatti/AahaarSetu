const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const volunteerAuthSchema = new mongoose.Schema(
  {
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
    volunteerProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VolunteerProfile",
    },
  },
  { timestamps: true },
);

volunteerAuthSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

module.exports = mongoose.model("VolunteerAuth", volunteerAuthSchema);
