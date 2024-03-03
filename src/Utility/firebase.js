
import firebase from "firebase/compat/app";
import {getAuth} from 'firebase/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDW18hv5XtE_K3K9MsPY7wAp3ecXTiOMB4",
  authDomain: "clone-82725.firebaseapp.com",
  projectId: "clone-82725",
  storageBucket: "clone-82725.appspot.com",
  messagingSenderId: "157231791161",
  appId: "1:157231791161:web:5cd529ce9d1ae8088661e8"
};

// Initialize Firebase
const app =firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();