// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

router.route('/').post(createOrder).get(getOrders);
router.route('/:id').put(updateOrder).delete(deleteOrder);

module.exports = router;
