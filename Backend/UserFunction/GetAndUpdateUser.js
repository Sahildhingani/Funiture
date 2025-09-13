const UserModel = require('../Model/UserModel');

async function GetAndUpdateUserOrderPlaced(req, resp) {
    try {
        const { UserEmail, id } = req.body;

        const UserData = await UserModel.findOneAndUpdate(
            { UserEmail },                    // find user by email
            { $push: { OrderPlaced: id } },   // push order id into OrderPlaced array
            { new: true }                     // return updated user
        );

        if (!UserData) {
            return resp.status(404).json({ msg: "User not found" });
        }

        return resp.status(200).json({
            msg: "Order successfully added to user",
            UserData,
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return resp.status(500).json({ msg: "Internal server error" });
    }
}

module.exports = GetAndUpdateUserOrderPlaced;
