import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/functions";
import "firebase/auth";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyD8FZw_uKAHNr8iQmiXzI7UjN9czcTyWqs",
  authDomain: "libre-4a7b9.firebaseapp.com",
  databaseURL: "https://libre-4a7b9.firebaseio.com",
  projectId: "libre-4a7b9",
  storageBucket: "libre-4a7b9.appspot.com",
  messagingSenderId: "529405055074",
  appId: "1:529405055074:web:608784ab67c4221e"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
let storage = firebase.storage();

// Authentication Setup
const auth = firebase.auth();
let currentUser = auth.currentUser;
auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user;
  }
});

export { auth, db, storage, currentUser };
