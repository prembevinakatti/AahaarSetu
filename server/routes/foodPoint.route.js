const express = require("express");
const isVolunteerAuthenticated = require("../middleware/volunteerMiddleware");
const {
  addFoodPoint,
  getNearbyFoodPoints,
} = require("../controllers/foodPoint.controller");

const router = express.Router();

router.route("/addFoodPoint").post(isVolunteerAuthenticated, addFoodPoint);

router
  .route("/getNearbyFoodPoints")
  .get(isVolunteerAuthenticated, getNearbyFoodPoints);

module.exports = router;
