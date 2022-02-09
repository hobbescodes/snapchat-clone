// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABO4W5VgnnFASlz_eIgd7PX-WLDEE5vuk",
  authDomain: "snapchat-clone-5b5bb.firebaseapp.com",
  projectId: "snapchat-clone-5b5bb",
  storageBucket: "snapchat-clone-5b5bb.appspot.com",
  messagingSenderId: "492835057028",
  appId: "1:492835057028:web:a4f81d7d2d396a7ebf41d1",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, db, storage, provider, auth };
