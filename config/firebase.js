// config/firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Ensure correct path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://videocall-app-ae4cf-default-rtdb.firebaseio.com"
});

const auth = () => admin.auth(); // Initialize Firebase Authentication as a function

module.exports = { admin, auth };
