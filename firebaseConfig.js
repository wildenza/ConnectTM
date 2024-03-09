// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, initializeAuth, getReactNativePersistence } from '@firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getDatabase} from "@firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBibUO_TCz6UUUy8Bl2apXrAPVw9QLhhgU",
    authDomain: "connectm-7df5c.firebaseapp.com",
    databaseURL: "https://connectm-7df5c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "connectm-7df5c",
    storageBucket: "connectm-7df5c.appspot.com",
    messagingSenderId: "311999934236",
    appId: "1:311999934236:web:a42b14042e8386b05a94d9"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, auth, database };
