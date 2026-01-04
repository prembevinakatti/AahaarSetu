const mongoose = require("mongoose");

const foodPoint = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
    foodType: {
      type: String,
      enum: ["Vegetarian", "Vegan", "Non-Vegetarian", "Mixed"],
      required: true,
    },
    timings: {
      type: String,
      required: true,
    },
    eligibility: {
      type: String,
      enum: ["Childrens", "Elderly", "Everyone", "Homeless"],
      default: "Everyone",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "LIMITED", "CLOSED"],
      default: "ACTIVE",
    },
    crowdLevel: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "LOW",
    },
    stockStatus: {
      type: String,
      enum: ["AVAILABLE", "LIMITED", "OUT_OF_STOCK"],
      default: "AVAILABLE",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminAuth",
    },
    verifiedAt: {
      type: Date,
    },
    addedByVolunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VolunteerAuth",
      required: true,
    },
  },
  { timestamps: true }
);

foodPoint.index({ location: "2dsphere" });

module.exports = mongoose.model("FoodPoint", foodPoint);
