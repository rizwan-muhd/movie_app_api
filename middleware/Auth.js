const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

function auth(req, res, next) {
  try {
    let user1;
    const authHeader = req.headers["authorization"];
    // console.log(authHeader)
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "No Token ,authorization denied" });
    }

    console.log(token);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403);
      }
      console.log("user", user);
      user1 = user;
    });

    req.user = user1;
    next();
  } catch (error) {
    console.log(error);
  }
}

module.exports = auth;
