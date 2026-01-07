const mongoose = require("mongoose");

const crisisModeSchema = new mongoose.Schema({
  isActive: {
    type: Boolean,
    default: false,
  },

  reason: {
    type: String,
  },

  location: {
    type: String,
    required: true,
  },

  activatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdminAuth",
  },

  activatedAt: {
    type: Date,
  },

  deactivatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("CrisisMode", crisisModeSchema);
