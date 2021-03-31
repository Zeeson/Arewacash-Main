import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// Your web app's Firebase configuration
if (typeof window !== "undefined" && !firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAVWlG0XGCh-OFYsIXpRF_C2FrlqoJ1gI8",
    authDomain: "arewapreneurs-5ce20.firebaseapp.com",
    projectId: "arewapreneurs-5ce20",
    storageBucket: "arewapreneurs-5ce20.appspot.com",
    messagingSenderId: "33604727610",
    appId: "1:33604727610:web:05f0b1b85140bd8e175603",
  });
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  // firebase.auth().settings.appVerificationDisabled = true
  // firebase.auth().settings.appVerificationDisabledForTesting = true
}

export default firebase;
