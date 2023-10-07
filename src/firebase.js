// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUlyp5ObNNqbCQQ95Ck8-DKfN3_eeCH4g",
  authDomain: "habittrackerappdev.firebaseapp.com",
  projectId: "habittrackerappdev",
  storageBucket: "habittrackerappdev.appspot.com",
  messagingSenderId: "825319476006",
  appId: "1:825319476006:web:01d145df5ad61b6eeb8fe7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
