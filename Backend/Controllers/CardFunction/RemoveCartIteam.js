const UserModel = require('../../Model/UserModel');

async function RemoveIteamFromCart(req, resp) {
  try {
    const { UserEmail, ProductId } = req.body;
    console.log(UserEmail,ProductId);
    await UserModel.findOneAndUpdate(
      { UserEmail },
      { $pull: { UserOrderes: { ProductId } } } // removes matching object from array
    );

    return resp.status(200).json({ msg: "Item removed from backend OrderCart" });
  } catch (error) {
    return resp.status(500).json({ msg: "Backend Error", error });
  }
}

module.exports = RemoveIteamFromCart;
