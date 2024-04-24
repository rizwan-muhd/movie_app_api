const movieSchema = require("../models/Movies");

exports.getMovies = async (req, res) => {
  try {
    const movies = await movieSchema.aggregate([
      { $unwind: "$genres" },
      { $group: { _id: "$genres", movies: { $push: "$$ROOT" } } },
    ]);
    res.status(200).json({
      success: true,
      movies,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
