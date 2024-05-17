// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbEAc2VEzRL1mDCuqewyPFEQE28uSnN2g",
  authDomain: "signin-signup-3e6f2.firebaseapp.com",
  projectId: "signin-signup-3e6f2",
  storageBucket: "signin-signup-3e6f2.appspot.com",
  messagingSenderId: "591191775529",
  appId: "1:591191775529:web:a6f0a0926dad4245bb3f38",
  measurementId: "G-D1HDLVDY13",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
