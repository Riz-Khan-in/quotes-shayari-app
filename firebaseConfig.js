// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDi-dWU2XETba3mowNI2I_3ZUq9Oh4KHQ0",
  authDomain: "quotesshayariapp.firebaseapp.com",
  projectId: "quotesshayariapp",
  storageBucket: "quotesshayariapp.firebasestorage.app",
  messagingSenderId: "576956224514",
  appId: "1:576956224514:web:fec1cdd76547523a78831b",
  measurementId: "G-GX5DGD5NS2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);