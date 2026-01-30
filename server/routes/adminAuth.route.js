const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
} = require("../controllers/adminAuth.controller");

const router = express.Router();

router.route("/registerAdmin").post(registerAdmin);
router.route("/loginAdmin").post(loginAdmin);
router.route("/getAllAdmins").get(getAllAdmins);

module.exports = router;
