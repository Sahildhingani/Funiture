const ProductModel = require('../Model/Productmodel');

async function GetWishListItems(req, resp) {
    try {
        const  WishListData  = req.body.WishListData; // array of product IDs
        // Find only products whose _id is in WishListData
        const data = await ProductModel.find({ ProductId: { $in: WishListData } });
        return resp.status(200).json(data); // send related products only
    } catch (error) {
        console.error(error);
        return resp.status(500).json({ message: 'Server error', error });
    }
}

module.exports = GetWishListItems;
