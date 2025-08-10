
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDroXt4jMkIGwQyitDjlMCk2K1uMorqClM",
    authDomain: "stusphere-181eb.firebaseapp.com",
    projectId: "stusphere-181eb",
    storageBucket: "stusphere-181eb.firebasestorage.app",
    messagingSenderId: "991250636910",
    appId: "1:991250636910:web:aa92e7e648ac4003e9467f",
    measurementId: "G-GYZBZYMTZG",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence using AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };
