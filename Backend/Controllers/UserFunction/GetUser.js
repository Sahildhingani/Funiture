const UserModel = require('../Model/UserModel');

async function UserData(req, resp) {
  try {
    // extract UserEmail from query directly
    const { UserEmail } = req.query;
    console.log(UserEmail);
    // query the database
    const data = await UserModel.findOne({ UserEmail });

    return resp.status(200).json({ UserData: data });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return resp.status(500).json({ msg: 'error' });
  }
}

module.exports = UserData;
