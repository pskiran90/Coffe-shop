// controllers/authController.js
const { auth, admin } = require('../config/firebase'); // Import the auth function from firebase config

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Create user with email and password using Firebase Authentication
    const userRecord = await auth().createUser({
      email,
      password,
      displayName: name // Optional: You can set the display name
    });

    res.status(201).json({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      message: 'User registered successfully'
    });
  } catch (error) {
    // Check if the error is due to email already exists
    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({ message: 'Email address is already in use by another account' });
    }

    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Failed to register user' });
  }
};
// controllers/authController.js
// controllers/authController.js
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Sign in user with email and password using Firebase Admin SDK
    const userCredential = await admin.auth().getUserByEmail(email);
    if (!userCredential) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the password
    await admin.auth().updateUser(userCredential.uid, {
      password: password
    });

    // Generate a custom token
    const customToken = await admin.auth().createCustomToken(userCredential.uid);

    // Return the custom token to the client
    res.json({
      customToken,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

