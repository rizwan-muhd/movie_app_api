const mongoose = require("mongoose");

// Define the movie schema
const movieSchema = new mongoose.Schema({
  backdrop: {
    type: String,
  },
  cast: {
    type: [String],
  },
  classification: {
    type: String,
  },
  director: {
    type: [String],
  },
  genres: {
    type: [String],
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  imdb_rating: {
    type: Number,
  },
  length: {
    type: String,
  },
  overview: {
    type: String,
  },
  poster: {
    type: String,
  },
  released_on: {
    type: Date,
  },
  slug: {
    type: String,
  },
  title: {
    type: String,
  },
});

// Create a model from the schema
module.exports = mongoose.model("movies", movieSchema);
