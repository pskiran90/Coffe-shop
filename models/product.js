// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  availabilityStatus: { type: Boolean, default: true },
});

module.exports = mongoose.model('Product', ProductSchema);
