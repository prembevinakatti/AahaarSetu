const express = require("express");
const isVolunteerAuthenticated = require("../middleware/volunteerMiddleware");
const {
  createVolunteerProfile,
  getVolunteerProfile,
  updateStatus,
} = require("../controllers/volunteerProfile.controller");

const router = express.Router();

router
  .route("/createVolunteerProfile")
  .post(isVolunteerAuthenticated, createVolunteerProfile);

router
  .route("/getVolunteerProfile")
  .get(isVolunteerAuthenticated, getVolunteerProfile);

router
  .route("/updateAvailabilityStatus")
  .patch(isVolunteerAuthenticated, updateStatus);

module.exports = router;
