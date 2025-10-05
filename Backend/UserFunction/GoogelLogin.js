const UserModel = require('../Model/UserModel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = process.env.JWT_SECRET || "yoursecret";

// Helper to generate JWT and send cookie
function SendTheToken(user, resp) {
  try {
    const token = jwt.sign(
      {
        id: user._id.toString(),
        UserId: user.UserId,
        UserName: user.UserName,
        UserEmail: user.UserEmail,
        UserWishList: user.UserWishList || [],
        UserOrderList: user.UserOrderList || [],
        UserRole: user.UserRole || "user",
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    resp.cookie("token", token, {
      httpOnly: true,
      secure: true, // must be true on HTTPS
      sameSite: "none", // required for cross-site
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    return resp.status(200).json({
      success: true,
      token,
      user: {
        UserName: user.UserName,
        UserEmail: user.UserEmail,
        UserWishList: user.UserWishList || [],
        UserOrderList: user.UserOrderList || [],
        UserRole: user.UserRole || "user",
        UserId: user.UserId,
      },
    });
  } catch (err) {
    console.error(err);
    return resp.status(500).json({ success: false, message: "Token generation failed" });
  }
}

// Helper to generate random password
function generateRandomPassword(length = 12) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Helper to generate random UserId
function generateRandomUserId(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let userId = "";
  for (let i = 0; i < length; i++) {
    userId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return userId;
}

async function GoogleLogin(req, resp) {
  try {
    console.log("reached the backne on google",req);
    const { UserEmail, UserName } = req.body;
    console.log(UserEmail);
    // Validate input
    if (!UserEmail || !UserName) {
      return resp.status(400).json({
        success: false,
        message: "UserEmail and UserName are required",
      });
    }

    // Check if user already exists
    let user = await UserModel.findOne({ UserEmail: UserEmail.trim() });

    if (!user) {
      // Generate random password and UserId
      const randomPassword = generateRandomPassword();
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      const UserId = generateRandomUserId();

      // Create new user
      user = await UserModel.create({
        UserName: UserName.trim(),
        UserEmail: UserEmail.trim(),
        UserPassword: hashedPassword,
        UserId,
      });

      console.log("New user created:", user);
      console.log(`New password (for reference): ${randomPassword}`);
    } else {
      console.log("Existing user logging in:", user);
    }

    // Send JWT and cookie
    return SendTheToken(user, resp);
  } catch (error) {
    console.error("GoogleLogin error:", error);
    return resp.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports = GoogleLogin;

