import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAl9Uh7C8NcdVcRPNqHz5O1SP8XnUBY_28",
  authDomain: "galeria-vue-7390f.firebaseapp.com",
  projectId: "galeria-vue-7390f",
  storageBucket: "galeria-vue-7390f.appspot.com",
  messagingSenderId: "709471977434",
  appId: "1:709471977434:web:037306e4f842a4176a4ae3",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const profileCollection = db.collection("profile");
const imagensCollection = db.collection("imagens");

export { db, auth, profileCollection, imagensCollection };
