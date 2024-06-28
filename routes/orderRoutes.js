// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');
const protect = require('../middleware/authMiddleware');

router.route('/').post(protect, createOrder).get(getOrders);
router.route('/:id').put(protect, updateOrder).delete(protect, deleteOrder);

module.exports = router;
