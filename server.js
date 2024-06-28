const express = require('express');
const dotenv = require('dotenv');
const { admin } = require('./config/firebase'); // Import admin from firebase.js
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/status', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log(`Server running at http://localhost:${PORT}`)

