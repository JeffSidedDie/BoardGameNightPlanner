import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { store } from 'src';
import { loginSuccess } from 'src/auth/auth.actions';

const config = {
    apiKey: "AIzaSyDWMGvNAvl10PX6nP0Fzar6Jtv1g6RNlyk",
    authDomain: "board-game-night-planner.firebaseapp.com",
    databaseURL: "https://board-game-night-planner.firebaseio.com",
    messagingSenderId: "622458243132",
    projectId: "board-game-night-planner",
    storageBucket: "board-game-night-planner.appspot.com",
};

export const firebaseApp = firebase.initializeApp(config);

const ui = new firebaseui.auth.AuthUI(firebaseApp.auth());
const uiConfig: firebaseui.IConfig = {
    callbacks: {
        signInSuccess: (currentUser: firebase.User, credential?: firebase.auth.AuthCredential) => {
            return false;
        }
    },
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
};

export function firebaseUiAuthStart(elementId: string): void {
    ui.start(elementId, uiConfig);
};

firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
        store.dispatch(loginSuccess(user.uid));
    }
    // else {
    //     this.setState({
    //         userId: undefined
    //     });
    //     this.ui.start('#firebaseui-auth-container', this.uiConfig);
    // }
});