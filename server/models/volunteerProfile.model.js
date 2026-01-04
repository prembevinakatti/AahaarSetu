const { default: mongoose } = require("mongoose");

const volunteerProfileSchema = new mongoose.Schema(
  {
    volunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VolunteerAuth",
      required: true,
    },
    orgName: {
      type: String,
      required: true,
    },
    currentArea: {
      type: String,
      required: true,
    },
    availabilityStatus: {
      type: String,
      enum: ["AVAILABLE", "OFFLINE"],
      default: "AVAILABLE",
    },
    associatedOrganization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminAuth",
    },
    volunteerId: {
      type: String,
      required: true,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    totalDistributions: {
      type: Number,
      default: 0,
    },
    lastActiveDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VolunteerProfile", volunteerProfileSchema);
