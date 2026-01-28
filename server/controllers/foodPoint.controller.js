const foodPointModel = require("../models/foodPoint.model");

module.exports.addFoodPoint = async (req, res) => {
  try {
    const { data } = req.body;
    const volunteer = req.volunteer;

    if (!data) {
      return res.status(400).json({ message: "Food point data is required" });
    }

    if (!volunteer) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (
      !data.location ||
      !data.location.coordinates ||
      data.location.coordinates.length !== 2
    ) {
      return res.status(400).json({
        message: "Valid location coordinates are required",
      });
    }

    const newFoodPoint = await foodPointModel.create({
      name: data.name,
      description: data.description,
      foodType: data.foodType,
      timings: data.timings,
      eligibility: data.eligibility,
      status: data.status,
      crowdLevel: data.crowdLevel,
      stockStatus: data.stockStatus,
      location: {
        type: "Point",
        coordinates: data.location.coordinates,
      },
      addedByVolunteer: volunteer,
    });

    return res.status(201).json({
      success: true,
      message: "Food point added successfully",
      foodPoint: newFoodPoint,
    });
  } catch (error) {
    console.error("Error adding food point:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getNearbyFoodPoints = async (req, res) => {
  try {
    const { latitude, longitude, maxDistance } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        message: "Latitude and longitude are required",
      });
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({
        message: "Invalid latitude or longitude",
      });
    }

    const distanceInMeters = maxDistance ? parseInt(maxDistance) * 1000 : 5000;

    const foodPoints = await foodPointModel.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          $maxDistance: distanceInMeters,
        },
      },
      status: { $ne: "CLOSED" },
    });

    return res.status(200).json({
      success: true,
      count: foodPoints.length,
      foodPoints,
    });
  } catch (error) {
    console.error("Error fetching nearby food points:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
