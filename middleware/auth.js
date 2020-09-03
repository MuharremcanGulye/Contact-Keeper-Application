const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get the token from the token
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user; // Here decoded is entire payload data but we want only user object
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
