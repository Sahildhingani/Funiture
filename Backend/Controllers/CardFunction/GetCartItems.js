const ProductModel = require('../Model/Productmodel');

async function SendCartData(req, resp) {
  try {
    const { OrderList } = req.body;  // [{ ProductId, Quantity }]
    console.log(OrderList);

    // Extract ProductIds
    const productIds = OrderList.map(item => item.ProductId);

    // Get products from DB
    const products = await ProductModel.find({ ProductId: { $in: productIds } });

    // Merge with quantity
    const mergedData = products.map(product => {
      const matchedOrder = OrderList.find(item => item.ProductId === product.ProductId);
      return {
        ...product.toObject(),
        Quantity: matchedOrder ? matchedOrder.Quantity : 1, // default 1 if not provided
      };
    });
    console.log('backend get called :',mergedData);
    return resp.status(200).json(mergedData);

  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: 'Server error', error });
  }
}

module.exports = SendCartData;

