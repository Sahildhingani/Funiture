const UserModel = require('../Model/UserModel');

async function ClearOrderListOfUser(req, resp) {
    try {
        const { UserEmail } = req.body;

        const data = await UserModel.findOneAndUpdate(
            { UserEmail },                     // find user by email
            { $set: { UserOrderes: [] } },     // clear UserOrderes
            { new: true }                      // return updated user
        );

        if (!data) {
            return resp.status(404).json({ msg: "User not found" });
        }

        return resp.status(200).json({
            msg: "User order list cleared successfully",
            data,
        });
    } catch (error) {
        console.error("Error clearing user order list:", error);
        return resp.status(500).json({ msg: "Internal server error" });
    }
}

module.exports = ClearOrderListOfUser;
