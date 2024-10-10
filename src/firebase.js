// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCpFyy6P8rusg35yjU3zuSVJHLIT-BMY5I",
  authDomain: "cv-pulsa-dcf0d.firebaseapp.com",
  projectId: "cv-pulsa-dcf0d",
  storageBucket: "cv-pulsa-dcf0d.appspot.com",
  messagingSenderId: "262118024310",
  appId: "1:262118024310:web:8028293febfdddcf86ab57"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
