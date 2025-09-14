const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../Model/UserModel");

const SECRET_KEY = process.env.JWT_SECRET;

async function Login(req, resp) {
  try {
    const { UserEmail, UserPassword } = req.body;

    // 1. Check if user exists
    const user = await UserModel.findOne({ UserEmail });
    if (!user) {
      return resp.status(404).json({ msg: "User not found" });
    }

    // 2. Compare hashed password
    const isMatch = await bcrypt.compare(UserPassword, user.UserPassword);
    if (!isMatch) {
      return resp.status(400).json({ msg: "Password or email is wrong" });
    }

    // 3. Generate JWT
    const token = jwt.sign(
      {
        id: user._id.toString(),
        UserId: user.UserId,
        UserName: user.UserName,
        UserEmail: user.UserEmail,
        UserWishList: user.UserWishList,
        UserOrderes: user.UserOrderes,
        UserRole: user.UserRole,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // 4. Cookie options (different for dev vs prod)
    const isProduction = process.env.NODE_ENV === "production";

    resp.cookie("token", token, {
      httpOnly: true, // safer, prevents JS access
      secure: isProduction, // true only on HTTPS
      sameSite: isProduction ? "None" : "Lax", // "None" for cross-site in prod
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    // 5. Final response
    return resp.status(200).json({
      msg: "Login successful",
      UserRole: user.UserRole,
    });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ msg: "Error in login", error: error.message });
  }
}

module.exports = Login;
