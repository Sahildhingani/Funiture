const OrderModel = require('../Model/OrderPlacedModel');

async function ToggleOrderStatus(req, res) {
  try {
    const { _id, field } = req.body; 
    const validFields = ['Paid', 'Dispatch', 'Out For Delivery', 'Delivered', 'Ordered'];

    if (!validFields.includes(field)) {
      return res.status(400).json({ message: "Invalid field" });
    }

    // Find the order first
    const order = await OrderModel.findById(_id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Flip the boolean
    const newValue = !order[field];

    // Update the field
    order[field] = newValue;
    await order.save();

    res.status(200).json({ message: `${field} toggled successfully`, data: order });
  } catch (error) {
    console.error(`Error toggling order status:`, error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = ToggleOrderStatus;


