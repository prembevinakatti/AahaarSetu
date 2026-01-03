const mongoose = require("mongoose");
const UserProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
  age: {
    type: Number,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
    required: true,
  },
  loaction: {
    type: String,
    required: true,
  },
  userGeneratedId:{
    type:String,
    required:true,
    unique:true
  }
});
module.exports = mongoose.model("UserProfile", UserProfileSchema);
