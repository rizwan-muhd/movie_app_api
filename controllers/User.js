const userSchema = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.addUser = async (req, res) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });
    console.log("user", user);
    if (user) {
      return res
        .status(409)
        .json({ message: "User with given email already exists" });
    }

    const saltRounds = Number(process.env.SALT);
    const salt = await bcrypt.genSalt(saltRounds);
    console.log("Generated salt:", salt);

    const hashPassword = await bcrypt.hash(req.body.password, salt);
    console.log("Hashed password:", hashPassword);

    const newUser = await new userSchema({
      ...req.body,
      password: hashPassword,
    }).save();

    res.status(200).send({
      success: true,
      newUser,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  const user = await userSchema.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  res.json({
    message: "Login succesfull",
    user,
    token,
  });
};

exports.getMyUser = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await userSchema.findById(id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.user.id;
    await userSchema.findByIdAndUpdate(id, { $set: req.body });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.user.id;
    await userSchema.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "deleted user successfully",
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userSchema.find();

    res.status(200).json({
      success: true,
      message: "all user listed",
      users,
    });
  } catch (error) {
    console.log(error);
  }
};
