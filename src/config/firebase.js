// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import * as firebase from "./firebase";
import * as Firestore from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyC0T3fmBUgFQlRqyXjqZI9_53cRXvxyZSw",

  authDomain: "fifi-uber-4.firebaseapp.com",

  projectId: "fifi-uber-4",

  storageBucket: "fifi-uber-4.appspot.com",

  messagingSenderId: "91621333154",

  appId: "1:91621333154:web:d22e23172d9df59cf71ffb"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);


export const googleProvider = new GoogleAuthProvider()

export const db = Firestore.initializeFirestore(app, {useFetchStreams: false, experimentalForceLongPolling: true});