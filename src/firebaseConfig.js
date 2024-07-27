
import firebase from "firebase/compat/app"; 
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyBojQmTeKYASgDfgSPWC2khqf05WFjHcPg",
  authDomain: "react-shop-9ae16.firebaseapp.com",
  projectId: "react-shop-9ae16",
  storageBucket: "react-shop-9ae16.appspot.com",
  messagingSenderId: "851994357388",
  appId: "1:851994357388:web:a68d1ca5627def09fb95a9",
  measurementId: "G-ZC9DFCL9GB"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
  
  export const auth = firebase.auth();
  export const db = firebase.database();
  export default firebase;