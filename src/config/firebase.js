import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB3V602TlonFqCePunNcxmGyY9T510w3Qo",
  authDomain: "fir-course-83223.firebaseapp.com",
  projectId: "fir-course-83223",
  storageBucket: "fir-course-83223.appspot.com",
  messagingSenderId: "512839895823",
  appId: "1:512839895823:web:731580413c0ed7f3448c7a"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app)