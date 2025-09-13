const UserModel = require('../Model/UserModel');

async function AddItemToCard(req, resp) {
  try {
    const { UserEmail, ProductId } = req.body;

    // Find the user
    const data = await UserModel.findOne({ UserEmail });

    if (!data) {
      return resp.status(404).json({ msg: "User not found" });
    }

    // Check if the product already exists in UserOrderes
    const alreadyExists = data.UserOrderes.some(
      (item) => item.ProductId.toString() === ProductId.toString()
    );

    if (alreadyExists) {
      return resp.status(200).json({ msg: "Item Already in the cart" });
    }

    // Insert the product into user's orders
    data.UserOrderes.push({ ProductId, Quantity: 1 });

    // Save updated document
    await data.save();

    return resp.status(200).json({ msg: "Item added to cart", cart: data.UserOrderes });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ msg: "Error from Backend", error: error.message });
  }
}

module.exports = AddItemToCard;
