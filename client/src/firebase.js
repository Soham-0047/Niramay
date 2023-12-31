// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "gpt-clone-56df7.firebaseapp.com",
  projectId: "gpt-clone-56df7",
  storageBucket: "gpt-clone-56df7.appspot.com",
  messagingSenderId: "129452463318",
  appId:import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);