const express = require("express");
const {
  registerAdmin,
  loginAdmin,
} = require("../controllers/adminAuth.controller");

const router = express.Router();

router.route("/registerAdmin").post(registerAdmin);
router.route("/loginAdmin").post(loginAdmin);

module.exports = router;
