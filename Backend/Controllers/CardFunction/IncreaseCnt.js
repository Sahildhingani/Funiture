const UserModel = require('../Model/UserModel');

async function IncreaseCnt(req, resp) {
  try {
    const { UserEmail, ProductId } = req.body;

    // Increase quantity by 1 for the matching product
    const updatedUser = await UserModel.findOneAndUpdate(
      { UserEmail },
      { $inc: { "UserOrderes.$[elem].Quantity": 1 } },
      {
        arrayFilters: [{ "elem.ProductId": ProductId }],
        new: true // return updated document
      }
    );

    if (!updatedUser) {
      return resp.status(404).json({ msg: "User or Product not found" });
    }

    // Find updated quantity for this product
    const updatedOrder = updatedUser.UserOrderes.find(
      (item) => item.ProductId === ProductId
    );

    return resp.status(200).json({
      msg: "Quantity incremented",
      ProductId,
      Quantity: updatedOrder?.Quantity
    });

  } catch (error) {
    console.error(error);
    return resp.status(500).json({ msg: "Increment Issue", error });
  }
}

module.exports = IncreaseCnt;
