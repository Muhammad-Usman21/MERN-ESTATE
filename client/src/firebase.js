// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estateee.firebaseapp.com",
  projectId: "mern-estateee",
  storageBucket: "mern-estateee.appspot.com",
  messagingSenderId: "813758312766",
  appId: "1:813758312766:web:539aef67e733c60e38bc6f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);