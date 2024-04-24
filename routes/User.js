const express = require("express");
const router = express();
const {
  addUser,
  getMyUser,
  getAllUsers,
  deleteUser,
  updateUser,
  login,
} = require("../controllers/User");
const auth = require("../middleware/Auth");

//post
router.post("/addUser", addUser);
router.post("/login", login);

//get
router.get("/getsUser", getMyUser);
router.get("/getallUser", auth, getAllUsers);

// put
router.get("/updateUser", updateUser);

//delete
router.delete("/deleteUser", auth, deleteUser);

module.exports = router;
