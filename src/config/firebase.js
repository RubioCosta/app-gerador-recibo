require('firebase/auth');
const firebase = require('firebase/app');
const auth = require('firebase/auth');
const { getDatabase } = require('firebase/database');

// Connection
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
  databaseURL: process.env.EXPO_PUBLIC_DATABASE
};

const app = firebase.initializeApp(firebaseConfig);

const db = getDatabase(app);

module.exports = {
  app,
  auth,
  db
};
