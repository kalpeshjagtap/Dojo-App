import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCIml3bQ0HneP59RwBK6ahLcSXzX76xraw",
    authDomain: "thedojo-c5a97.firebaseapp.com",
    projectId: "thedojo-c5a97",
    storageBucket: "thedojo-c5a97.appspot.com",
    messagingSenderId: "412092281475",
    appId: "1:412092281475:web:1b44a837dbd25a94bf21b6"
};

// initialize the firebase
firebase.initializeApp(firebaseConfig);

// initialize services

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();
// timestamp function
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp };