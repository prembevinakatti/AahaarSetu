const { default: mongoose } = require("mongoose");

const verifySchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminAuth",
      required: true,
    },
    volunteerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VolunteerAuth",
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Verify", verifySchema);
