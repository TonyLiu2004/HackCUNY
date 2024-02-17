// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { collection, getFirestore, getDocs, doc } from "firebase/firestore"
import { getDownloadURL, getStorage, ref } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBykznOn2Oq0SFCOzynRDeAbS_LzhjsAzI",
    authDomain: "hackcuny-aa3d6.firebaseapp.com",
    projectId: "hackcuny-aa3d6",
    storageBucket: "hackcuny-aa3d6.appspot.com",
    messagingSenderId: "9858619697",
    appId: "1:9858619697:web:236baf54842546ec687810"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Database
const database = getFirestore(); 

// Initalize Storage
const storage = getStorage(); 

// Initialize Authentication
const auth = getAuth(app); 

export { auth, storage, database }