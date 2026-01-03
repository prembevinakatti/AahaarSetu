const express = require("express");
const isVolunteerAuthenticated = require("../middleware/volunteerMiddleware");
const {
  getVerificationRequests,
  requestVerification,
  AcceptOrRejectVerification,
  getAllVerifications,
} = require("../controllers/verify.controller");
const isAdminAuthenticated = require("../middleware/adminMiddleware");

const router = express.Router();

router
  .route("/requestVerification")
  .post(isVolunteerAuthenticated, requestVerification);

router
  .route("/acceptOrRejectVerification")
  .put(isAdminAuthenticated, AcceptOrRejectVerification);

router
  .route("/getVerificationRequests")
  .get(isAdminAuthenticated, getVerificationRequests);

router
  .route("/getAllVerifications")
  .get(isAdminAuthenticated, getAllVerifications);

module.exports = router;
