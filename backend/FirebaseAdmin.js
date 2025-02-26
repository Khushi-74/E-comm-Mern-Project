const admin = require("firebase-admin");
const serviceAccount = require("./FirebaseConfig.json"); // Import the service account JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;