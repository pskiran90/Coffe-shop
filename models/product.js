const admin = require('firebase-admin');
const db = admin.firestore();

const ProductSchema = db.collection('products');

module.exports = ProductSchema;
