// authService.js

import { getAuth, signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  // Your Firebase configuration object here
  apiKey: "AIzaSyBlhGFtsWKQ7_yTuZUntx7Fgw9dOsjvQB8",
  authDomain: "react-ott-e89b9.firebaseapp.com",
  projectId: "react-ott-e89b9", 
  storageBucket: "react-ott-e89b9.appspot.com",
  messagingSenderId: "14065465321",
  appId: "1:14065465321:web:ae481ee801ba51ad017d78",
  measurementId: "G-DWL2JFC7SB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      return result.user;
    });
};

const signOut = () => {
  return firebaseSignOut(auth);
};

export { signInWithGoogle, signOut };
