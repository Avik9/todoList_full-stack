import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
  apiKey: "AIzaSyBAdh1nfvfArhC7GacK7JVKMY1jA8GcmbI",
  authDomain: "akadakia-todolist.firebaseapp.com",
  databaseURL: "https://akadakia-todolist.firebaseio.com",
  projectId: "akadakia-todolist",
  storageBucket: "akadakia-todolist.appspot.com",
  messagingSenderId: "190346104081",
  appId: "1:190346104081:web:216d8ab8be8b45f597d0b0",
  measurementId: "G-EMFT0Y2YRR"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;