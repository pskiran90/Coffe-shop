// controllers/authController.js
const { admin } = require('../config/firebase');
const jwt = require('jsonwebtoken');

const generateToken = (uid) => {
  return jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    const token = generateToken(userRecord.uid);
    res.status(201).json({
      uid: userRecord.uid,
      email: userRecord.email,
      token: token,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ message: 'Failed to register user' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    if (!userRecord) {
      return res.status(404).json({ message: 'User not found' });
    }
    const token = generateToken(userRecord.uid);
    res.json({
      uid: userRecord.uid,
      email: userRecord.email,
      token: token,
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(401).json({ message: 'Invalid email or password' });
  }
};
