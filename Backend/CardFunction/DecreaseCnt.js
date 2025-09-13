const UserModel = require('../Model/UserModel');

async function DecreaseCnt(req, resp) {
  try {
    const { UserEmail, ProductId } = req.body;

    // Find the user first (to check current quantity)
    const user = await UserModel.findOne({ UserEmail });
    if (!user) {
      return resp.status(404).json({ msg: "User not found" });
    }

    // Find the product inside UserOrderes
    const orderItem = user.UserOrderes.find(item => item.ProductId === ProductId);
    if (!orderItem) {
      return resp.status(404).json({ msg: "Product not found in orders" });
    }

    // Prevent going below 1
    if (orderItem.Quantity <= 1) {
      return resp.status(400).json({ msg: "Quantity cannot be less than 1" });
    }

    // Decrease quantity by 1 for the matching product
    const updatedUser = await UserModel.findOneAndUpdate(
      { UserEmail },
      { $inc: { "UserOrderes.$[elem].Quantity": -1 } },
      {
        arrayFilters: [{ "elem.ProductId": ProductId }],
        new: true // return updated document
      }
    );

    // Find updated quantity
    const updatedOrder = updatedUser.UserOrderes.find(
      (item) => item.ProductId === ProductId
    );

    return resp.status(200).json({
      msg: "Quantity decremented",
      ProductId,
      Quantity: updatedOrder?.Quantity
    });

  } catch (error) {
    console.error(error);
    return resp.status(500).json({ msg: "Decrement Issue", error });
  }
}

module.exports = DecreaseCnt;
