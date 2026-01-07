const express = require("express");
const isAdminAuthenticated = require("../middleware/adminMiddleware");
const {
  activateCrisisMode,
  deactivateCrisisMode,
  getCrisisModeStatus,
} = require("../controllers/crisisMode.controller");

const router = express.Router();

router
  .route("/activateCrisisMode")
  .post(isAdminAuthenticated, activateCrisisMode);

router
  .route("/deactivateCrisisMode")
  .post(isAdminAuthenticated, deactivateCrisisMode);

router.route("/getCrisisStatus").get(isAdminAuthenticated, getCrisisModeStatus);

module.exports = router;
