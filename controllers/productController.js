const Product = require('../models/product');

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, availabilityStatus } = req.body;

    const productRef = await Product.add({
      name,
      description,
      price,
      category,
      availabilityStatus,
    });

    const doc = await productRef.get();

    if (!doc.exists) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(201).json(doc.data());
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const snapshot = await Product.get();
    const products = [];

    snapshot.forEach(doc => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, availabilityStatus } = req.body;

    const productRef = Product.doc(id);
    const snapshot = await productRef.get();

    if (!snapshot.exists) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      await productRef.update({
        name: name || snapshot.data().name,
        description: description || snapshot.data().description,
        price: price || snapshot.data().price,
        category: category || snapshot.data().category,
        availabilityStatus: availabilityStatus !== undefined ? availabilityStatus : snapshot.data().availabilityStatus
      });

      const updatedProduct = await productRef.get();
      res.json(updatedProduct.data());
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const productRef = Product.doc(id);
    const snapshot = await productRef.get();

    if (!snapshot.exists) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      await productRef.delete();
      res.json({ message: 'Product removed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
