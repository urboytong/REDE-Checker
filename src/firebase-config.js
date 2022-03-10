// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5nMA70lvRSFSw9KLoDHragu0H47kt6K4",
  authDomain: "rede-checker.firebaseapp.com",
  projectId: "rede-checker",
  storageBucket: "rede-checker.appspot.com",
  messagingSenderId: "314591792597",
  appId: "1:314591792597:web:c3385e7a0572798506015c",
  measurementId: "G-P64KG9FT01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);