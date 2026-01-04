module.exports.addFoodPoint = async (req, res) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ message: "Food point data is required" });
    }

    

  } catch (error) {
    console.error("Error adding food point:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
