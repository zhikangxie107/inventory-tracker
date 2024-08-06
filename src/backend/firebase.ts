// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "inventory-management-14a34.firebaseapp.com",
  projectId: "inventory-management-14a34",
  storageBucket: "inventory-management-14a34.appspot.com",
  messagingSenderId: "884927487025",
  appId: "1:884927487025:web:4fe4610272945519ad8910",
  measurementId: "G-61CDYZHDPL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app)

export { firestore, auth };
