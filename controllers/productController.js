// controllers/productController.js
const Product = require('../models/product');

exports.createProduct = async (req, res) => {
  const { name, description, price, category, availabilityStatus } = req.body;

  const product = new Product({
    name,
    description,
    price,
    category,
    availabilityStatus,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

exports.getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.availabilityStatus =
      req.body.availabilityStatus !== undefined
        ? req.body.availabilityStatus
        : product.availabilityStatus;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};
