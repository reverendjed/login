/**
 * App Component
 * 
 * Description:
 * This is the main configuration file for the Firebase SDK. It initializes the Firebase app and exports the
 * necessary objects for Firebase Authentication and Firestore.
 * 
 * @module firebase-config
 * @see {@link https://firebase.google.com/docs/reference/js}
 * 
 * @typedef {Object} FirebaseConfig
 * @property {string} apiKey - The API key for the Firebase project.
 * @property {string} authDomain - The domain for the Firebase project.
 * @property {string} projectId - The ID of the Firebase project.
 * @property {string} storageBucket - The storage bucket for the Firebase project.
 * @property {string} messagingSenderId - The messaging sender ID for the Firebase project.
 * @property {string} appId - The app ID for the Firebase project.
 * @property {string} measurementId - The measurement ID for the Firebase project.
 * 
 * @typedef {Object} FirebaseApp
 * @property {FirebaseConfig} options - The configuration options for the Firebase app.
 * 
 * @typedef {Object} FirebaseDB
 * @property {FirebaseApp} app - The Firebase app instance.
 * 
 * @typedef {Object} FirebaseAuth
 * @property {FirebaseApp} app - The Firebase app instance.
 * 
 * @typedef {Object} FirebaseFirestore
 * @property {FirebaseApp} app - The Firebase app instance.
 * 
 * @typedef {Object} FirebaseExports
 * @property {FirebaseDB} db - The Firebase Firestore instance.
 * @property {FirebaseAuth} auth - The Firebase Authentication instance.
 * @property {FirebaseApp} app - The Firebase app instance.
 * 
 * @type {FirebaseConfig}
 */
/**
 * App Component
 * 
 * Description:
 * This is the main configuration file for the Firebase SDK. It initializes the Firebase app and exports the
 * Author: Jeffry Jones
 * Date: 2024-02-03
 */

// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNtTIdeLlJVx_ipJv6eeazzV-fi91X6cs",
  authDomain: "h2overwatch-c75ab.firebaseapp.com",
  projectId: "h2overwatch-c75ab",
  storageBucket: "h2overwatch-c75ab.appspot.com",
  messagingSenderId: "519633988724",
  appId: "1:519633988724:web:6b2867e0000bd82ac17521",
  measurementId: "G-T32HZD2GZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, app };
