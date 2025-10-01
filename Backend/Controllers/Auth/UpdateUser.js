const UserModel = require('../../Model/UserModel');

// User can update their UserName, PhoneNumber, UserAddress
const UpdateUser = async (req, resp) => {
    try {
        const UserEmail = req.UserEmail; // assuming middleware sets req.UserEmail
        const { UserName, PhoneNumber, UserAddress } = req.body;

        // Create update object dynamically to avoid overwriting undefined fields
        const updateFields = {};
        if (UserName !== undefined) updateFields.UserName = UserName;
        if (PhoneNumber !== undefined) updateFields.PhoneNumber = PhoneNumber;
        if (UserAddress !== undefined) updateFields.UserAddress = UserAddress;

        // If no fields are provided, return a message
        if (Object.keys(updateFields).length === 0) {
            return resp.status(400).json({ message: "No fields provided for update" });
        }

        // Update the user
        const user = await UserModel.findOneAndUpdate(
            { UserEmail },           // find user by email
            { $set: updateFields },  // update only provided fields
            { new: true }            // return updated document
        );

        if (!user) {
            return resp.status(404).json({ message: "User not found" });
        }

        return resp.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error(error);
        return resp.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { UpdateUser };

