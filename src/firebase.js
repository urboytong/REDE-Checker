// เรียกใช้ module
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// ค่า minimum configuration คือ `apiKey` และ `projectId`
const config = firebase.initializeApp({
  apiKey: "AIzaSyAbGtnDaH9u37Xc1y7FKpb7fBPRAeOqqc8",
  authDomain: "rede-checker-31670.firebaseapp.com",
  projectId: "rede-checker-31670",
  storageBucket: "rede-checker-31670.appspot.com",
  messagingSenderId: "251904997482",
  appId: "1:251904997482:web:256fcd039b73afd3257213",
  measurementId: "G-EQ0TL9155E",
});

export default firebase.apps[0] || firebase.initializeApp(config);
