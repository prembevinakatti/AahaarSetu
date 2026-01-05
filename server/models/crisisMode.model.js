const mongoose = require("mongoose");

const crisesModeSchema = new mongoose.Schema({
  isActive: {
    type: Boolean,
    default: false,
  },

  reason: {
    type: String,
  },

  loaction: {
    type: String,
    required: true,
  },

  activatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdminAuth",
  },

  activatedBy: {
    type: Date,
  },

  deactivatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("CrisesMode", crisesModeSchema);
