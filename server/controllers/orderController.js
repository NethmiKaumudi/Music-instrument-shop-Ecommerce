const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const mongoose = require('mongoose');

// POST /api/orders/placeOrder
exports.placeOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, address, contactNumber, cartItems, totalAmount } = req.body;

    // Create new order
    const order = new Order({
      orderId: generateOrderId(),
      name,
      address,
      contactNumber,
      totalAmount,
    });

    // Save order to database
    await order.save({ session });

    // Update product quantities in a transactional manner
    for (const item of cartItems) {
      const product = await Product.findById(item._id).session(session);
      if (!product) {
        throw new Error(`Product with ID ${item._id} not found`);
      }
      product.quantity -= item.quantity;
      await product.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: 'Order placed successfully', orderId: order.orderId });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
};

// Example function to generate unique order ID
function generateOrderId() {
  return Math.random().toString(36).substr(2, 9); // Example: Generate a random alphanumeric string
}
