// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqBsmR6fl42DW5FF7xedyL0KyxteGbLY4",
  authDomain: "utility-billhub.firebaseapp.com",
  projectId: "utility-billhub",
  storageBucket: "utility-billhub.firebasestorage.app",
  messagingSenderId: "773171063910",
  appId: "1:773171063910:web:46e22f7df811fa7b9891a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);