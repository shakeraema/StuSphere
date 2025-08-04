// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDroXt4jMkIGwQyitDjlMCk2K1uMorqClM",
  authDomain: "stusphere-181eb.firebaseapp.com",
  projectId: "stusphere-181eb",
  storageBucket: "stusphere-181eb.firebasestorage.app",
  messagingSenderId: "991250636910",
  appId: "1:991250636910:web:aa92e7e648ac4003e9467f",
  measurementId: "G-GYZBZYMTZG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
