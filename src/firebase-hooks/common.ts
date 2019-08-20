import * as firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import * as firebaseui from 'firebaseui';
import { Document } from 'models';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDWMGvNAvl10PX6nP0Fzar6Jtv1g6RNlyk",
    authDomain: "board-game-night-planner.firebaseapp.com",
    databaseURL: "https://board-game-night-planner.firebaseio.com",
    projectId: "board-game-night-planner",
    storageBucket: "board-game-night-planner.appspot.com",
    messagingSenderId: "622458243132",
    appId: "1:622458243132:web:7263d1b0197c24d7"
};
// Initialize Firebase
const fbApp = firebase.initializeApp(firebaseConfig);

export const auth = fbApp.auth();
export const authSignInOptions = [firebase.auth.GoogleAuthProvider.PROVIDER_ID];
export const authUI = new firebaseui.auth.AuthUI(auth);
export const db = fbApp.firestore();
export const storage = fbApp.storage();

export enum Collections {
    Users = 'users',
    Events = 'events',
    Games = 'games',
}

export function convertDocument<T>(document: firebase.firestore.DocumentSnapshot): Document<T> {
    return {
        id: document.id,
        data: document.data() as T
    }
}