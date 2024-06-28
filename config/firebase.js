// config/firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Make sure this path is correct

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://videocall-app-ae4cf-default-rtdb.firebaseio.com" // Replace with your Firebase Realtime Database URL
});

const auth = () => admin.auth(); // Initialize Firebase Authentication as a function

const db = admin.database();

const connectDB = () => {
  return db; // Return the Firebase database instance
};

module.exports = { admin, auth };
