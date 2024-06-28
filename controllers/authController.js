const { admin } = require('../config/firebase');
const jwt = require('jsonwebtoken');

const generateToken = (uid) => {
  return jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.registerUser = async (req, res) => {
  const { email, password, username, role } = req.body;
  try {
    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Update user profile (optional: setting displayName)
    await admin.auth().updateUser(userRecord.uid, {
      displayName: username,
    });

    // Store user details in Firestore
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      email: userRecord.email,
      username: username,
      role: role || 'user',
    });

    const token = generateToken(userRecord.uid);

    res.status(200).json({
      token: token,
      uid: userRecord.uid,
      email: userRecord.email,
      username: username,
      message: 'User registered successfully',
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
      token: token,
      uid: userRecord.uid,
      email: userRecord.email,
      message: 'User login successful'
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const usersSnapshot = await admin.firestore().collection('users').get();
    const users = [];

    usersSnapshot.forEach((doc) => {
      users.push({
        uid: doc.id,
        email: doc.data().email,
        username: doc.data().username,
        role: doc.data().role,
      });
    });

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};
