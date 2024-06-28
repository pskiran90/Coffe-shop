

const admin = require('firebase-admin');
const db = admin.firestore();

const Order = db.collection('orders');

module.exports = Order;
