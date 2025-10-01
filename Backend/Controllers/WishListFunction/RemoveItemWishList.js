const UserModel = require('../../Model/UserModel');

async function RemoveWishItems(req, resp) {
    try {
        const { ProductId, UserEmail } = req.body;

        if (!ProductId || !UserEmail) {
            return resp.status(400).json({ message: "ProductId and UserEmail are required" });
        }

        // Use updateOne or findOneAndUpdate with $pull
        const result = await UserModel.findOneAndUpdate(
            { UserEmail },
            { $pull: { UserWishList: ProductId } },  // removes matching ProductId from array
            { new: true } // returns updated document
        );

        if (!result) {
            return resp.status(404).json({ message: "User not found" });
        }

        resp.status(200).json({
            message: "Item removed from wishlist",
            updatedWishlist: result.UserWishList
        });

    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = RemoveWishItems;
