// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "findandsearchgame.firebaseapp.com",
  projectId: "findandsearchgame",
  storageBucket: "findandsearchgame.appspot.com",
  messagingSenderId: "885613787911",
  appId: "1:885613787911:web:f70c46e08122b7e52e63a2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
