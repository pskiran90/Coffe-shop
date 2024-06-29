// controllers/orderController.js - Using Firebase Firestore

const Order = require('../models/Order'); // Adjust path as per your directory structure

exports.createOrder = async (req, res) => {
  try {
    const { userId, products, quantity, orderStatus, totalPrice } = req.body;

    const newOrderRef = await Order.add({
      userId,
      products,
      quantity,
      orderStatus,
      totalPrice,
      orderDate: new Date(), // Assuming you want to set orderDate to the current date/time
    });

    res.status(200).json(newOrderRef.id); // Respond with the ID of the created order
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Error creating order' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const snapshot = await Order.get();
    const orders = [];

    snapshot.forEach(doc => {
      orders.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(orders);
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(500).json({ error: 'Error getting orders' });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus, quantity } = req.body;

    const orderRef = Order.doc(id);
    const snapshot = await orderRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Only update the fields that are provided in the request body
    await orderRef.update({
      orderStatus: orderStatus || snapshot.data().orderStatus,
      quantity: quantity || snapshot.data().quantity, // Update quantity if provided
    });

    res.json({ message: 'Order updated' });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Error updating order' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const orderRef = Order.doc(id);
    const snapshot = await orderRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await orderRef.delete();

    res.json({ message: 'Order deleted' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Error deleting order' });
  }
};
