// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsdIzsxCh5PAq54dE7v9cfeVO8IjODa6U",
  authDomain: "fir-auth-113-af7c3.firebaseapp.com",
  databaseURL: "https://fir-auth-113-af7c3-default-rtdb.firebaseio.com",
  projectId: "fir-auth-113-af7c3",
  storageBucket: "fir-auth-113-af7c3.appspot.com",
  messagingSenderId: "468672224201",
  appId: "1:468672224201:web:683a2333eb8952579de618",
  measurementId: "G-BLFS6KPLCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db =getFirestore(app);

export {db}