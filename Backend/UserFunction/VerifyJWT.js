const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyJWT(req, res, next) {
  const JWT_SECRET = process.env.JWT_SECRET;
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // ✅ Attach user details to req for next middleware/route
    req.user = decoded;

    console.log("✅ Token verified for:", decoded);

    // ✅ Continue to next route/controller
    next();

  } catch (err) {
    console.error("❌ JWT error:", err.message);
    return res.status(403).json({ valid: false, msg: "Invalid or expired token" });
  }
}

module.exports = verifyJWT;





