import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import * as firebaseui from 'firebaseui';
import { store } from 'src';
import { loginSuccess } from 'src/auth/auth.actions';
import { IUser } from 'src/common/models';

const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyDWMGvNAvl10PX6nP0Fzar6Jtv1g6RNlyk',
    authDomain: 'board-game-night-planner.firebaseapp.com',
    databaseURL: 'https://board-game-night-planner.firebaseio.com',
    messagingSenderId: '622458243132',
    projectId: 'board-game-night-planner',
    storageBucket: 'board-game-night-planner.appspot.com',
});

export const auth = firebaseApp.auth();
export const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true,
});

export enum Collections {
    Users = 'users',
    Events = 'events',
}

auth.onAuthStateChanged(async user => {
    if (user) {
        const dbUser = await db.collection(Collections.Users).doc(user.uid).get();
        store.dispatch(loginSuccess(user.uid, user.displayName!, user.email!, dbUser.data()!.isAdmin));
    }
});

const ui = new firebaseui.auth.AuthUI(auth);

export function firebaseUiAuthStart(elementId: string): void {
    ui.start(elementId, {
        callbacks: {
            signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                if (authResult.user) {
                    const user: IUser = {
                        displayName: authResult.user.displayName,
                        email: authResult.user.email,
                    };
                    db.collection(Collections.Users).doc(authResult.user.uid).set(user, { merge: true });
                }
                return false;
            }
        },
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
    });
}