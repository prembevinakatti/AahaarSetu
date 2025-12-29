const express = require("express");
const {
  registerVolunteer,
  loginVolunteer,
  logoutVolunteer,
} = require("../controllers/volunteerAuth.controller");

const router = express.Router();

router.route("/volunteerRegister").post(registerVolunteer);
router.route("/volunteerLogin").post(loginVolunteer);
router.route("/volunteerLogout").post(logoutVolunteer);

module.exports = router;
