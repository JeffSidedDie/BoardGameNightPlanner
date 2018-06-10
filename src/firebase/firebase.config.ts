import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import * as firebaseui from 'firebaseui';
import { store } from 'src';
import { loginSuccess } from 'src/auth/auth.actions';

export const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDWMGvNAvl10PX6nP0Fzar6Jtv1g6RNlyk",
    authDomain: "board-game-night-planner.firebaseapp.com",
    databaseURL: "https://board-game-night-planner.firebaseio.com",
    messagingSenderId: "622458243132",
    projectId: "board-game-night-planner",
    storageBucket: "board-game-night-planner.appspot.com",
});

const auth = firebaseApp.auth();
const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true,
});

enum Collections {
    Users = "users",
}

auth.onAuthStateChanged(user => {
    if (user) {
        store.dispatch(loginSuccess(user.uid));
    }
});

const ui = new firebaseui.auth.AuthUI(auth);

export function firebaseUiAuthStart(elementId: string): void {
    ui.start(elementId, {
        callbacks: {
            signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                if (authResult.user) {
                    db.collection(Collections.Users).doc(authResult.user.uid).set({
                        displayName: authResult.user.displayName,
                        email: authResult.user.email,
                        isAdmin: false,
                    });
                }
                return false;
            }
        },
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
    });
};