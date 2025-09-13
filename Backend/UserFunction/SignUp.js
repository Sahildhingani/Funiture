const UserModel=require('../Model/UserModel');
const bcrypt = require("bcrypt");
const saltRounds = 265;
const {nanoid}=require('nanoid');
async function SignUp(req, resp) {
  try {
    const { UserEmail, UserName, UserPassword } = req.body;
    const id=nanoid();
    console.log(req.body);
    if (!UserEmail || !UserName || !UserPassword) {
      return resp.status(400).json({ msg: "Missing required fields" });
    }

    // check if user already exists
    const existing = await UserModel.findOne({ UserEmail });
    if (existing) {
      return resp.status(200).json({ msg: "User Already exist" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(UserPassword, 10);

    // create user
    const response = await UserModel.create({
      UserName,
      UserEmail,
      UserPassword: hashedPassword,
      UserId:id,
    });

    return resp.status(200).json({ msg: "User Created Successfully", user: response });
  } catch (error) {
    console.error("Signup Error:", error);
    return resp.status(500).json({ msg: "User creation error", error: error.message });
  }
}


module.exports=SignUp;