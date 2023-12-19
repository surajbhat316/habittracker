// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyCUlyp5ObNNqbCQQ95Ck8-DKfN3_eeCH4g" ,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "habittrackerappdev.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "habittrackerappdev",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "habittrackerappdev.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "825319476006" ,
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:825319476006:web:01d145df5ad61b6eeb8fe7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
