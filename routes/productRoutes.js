// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');

router.route('/').post( createProduct).get(getProducts);
router.route('/:id').put( updateProduct).delete( deleteProduct);

module.exports = router;
