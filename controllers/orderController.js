// controllers/orderController.js
const Order = require('../models/order');

exports.createOrder = async (req, res) => {
  const { customerName, products, quantity, orderStatus, totalPrice } = req.body;

  const order = new Order({
    customerName,
    products,
    quantity,
    orderStatus,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find({}).populate('products');
  res.json(orders);
};

exports.updateOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.orderStatus = req.body.orderStatus || order.orderStatus;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

exports.deleteOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    await order.remove();
    res.json({ message: 'Order removed' });
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};
