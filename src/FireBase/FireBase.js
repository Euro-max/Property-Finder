// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import{getAuth} from "firebase/auth";
import{getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9RU1k0R1vMAoOi6us4SDF5VnCzEJmtQ8",
  authDomain: "home-8b37a.firebaseapp.com",
  projectId: "home-8b37a",
  storageBucket: "home-8b37a.appspot.com",
  messagingSenderId: "104769720530",
  appId: "1:104769720530:web:56a4839f4878d9c1271d0b"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db=getFirestore();
const auth=getAuth()
const storage=getStorage(initializeApp(firebaseConfig))
export {storage,db,auth}