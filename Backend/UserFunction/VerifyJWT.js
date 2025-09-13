const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyJWT(req, res) {
  const JWT_SECRET = process.env.JWT_SECRET;
  const token = req.body.token?.trim();
  if (!token) {
    return res.status(400).json({ msg: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", decoded);
    return res.status(200).json({ data: decoded });
  } catch (err) {
    console.log("JWT error:", err);
    return res.status(500).json({ valid: false, message: "Invalid or expired token" });
  }
}

module.exports = verifyJWT;



