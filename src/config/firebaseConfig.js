import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyCFha0jCk_GxHo2QosRynGBv49Sj-NSsvM",
    authDomain: "todo-rff-316.firebaseapp.com",
    databaseURL: "https://todo-rff-316.firebaseio.com",
    projectId: "todo-rff-316",
    storageBucket: "todo-rff-316.appspot.com",
    messagingSenderId: "241005177864",
    appId: "1:241005177864:web:bcd1ef14c5603220fe35bd",
    measurementId: "G-1FGWLMW5J7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;