const UserModel = require('../Model/UserModel');

async function Additems(req, resp) {
    try {
        const { ProductId, UserEmail } = req.body;
        if (!ProductId || !UserEmail) {
            return resp.status(400).json({ msg: "ProductId and UserEmail are required" });
        }

        const user = await UserModel.findOne({ UserEmail });
        if (!user) {
            return resp.status(404).json({ msg: "User not found" });
        }

        const WishList = user.UserWishList;

        if (!WishList.includes(ProductId)) {
            WishList.push(ProductId);
            await user.save(); // save the changes
            return resp.status(200).json({ msg: "Added item to the wish list" });
        }
        console.log(WishList);
        return resp.status(200).json({ msg: "Item already in the wish list" });

    } catch (error) {
        console.error("Add WishList Error:", error);
        return resp.status(500).json({ msg: "Add WishList Error" });
    }
}

module.exports = Additems;
