const express = require("express");
const router = express();
const { getMovies } = require("../controllers/Movies");
const auth = require("../middleware/Auth");

//get
router.get("/getMovies", auth, getMovies);

module.exports = router;
