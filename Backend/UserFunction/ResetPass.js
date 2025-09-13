const UserModel = require('../Model/UserModel');
const bcrypt = require('bcrypt'); // for hashing passwords

async function ResetPassword(req, resp) {
    try {
        const { UserEmail, newPassword } = req.body;

        if (!UserEmail || !newPassword) {
            return resp.status(400).json({ msg: "Email and new password are required" });
        }

        // Hash the new password before saving
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Find the user by UserEmail and update UserPassword
        const user = await UserModel.findOneAndUpdate(
            { UserEmail: UserEmail },
            { UserPassword: hashedPassword },
            { new: true } // return the updated document
        );

        if (!user) {
            return resp.status(404).json({ msg: "User not found" });
        }

        resp.status(200).json({ msg: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        resp.status(500).json({ msg: "Server error" });
    }
}

module.exports = ResetPassword;
