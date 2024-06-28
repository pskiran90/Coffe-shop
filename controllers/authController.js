const { admin } = require('../config/firebase');
const jwt = require('jsonwebtoken');

const generateToken = (uid) => {
  return jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.registerUser = async (req, res) => {
  const { email, password, username, role } = req.body; // Added username
  try {
    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Update user profile (optional: setting displayName)
    await admin.auth().updateUser(userRecord.uid, {
      displayName: username, // Use username as displayName
    });

    // Store user details in Firestore
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      email: userRecord.email,
      username: username, // Store username in Firestore
      role: role || 'user', // Default role if not provided
    });

    const token = generateToken(userRecord.uid);

    res.status(200).json({
      token: token,
      uid: userRecord.uid,
      email: userRecord.email,
      username: username, // Include username in response
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
      message: 'User login successfull'

    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(401).json({ message: 'Invalid email or password' });
  }
};
