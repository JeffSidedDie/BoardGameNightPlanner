import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import * as React from 'react';
import { firebaseApp } from 'src';

interface IAuthState {
    readonly userId?: string;
}

export class Auth extends React.Component<{}, IAuthState> {

    private ui = new firebaseui.auth.AuthUI(firebaseApp.auth())
    private uiConfig: firebaseui.IConfig = {
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

    public componentDidMount() {
        firebaseApp.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    userId: user.uid
                });
            }
            else {
                this.setState({
                    userId: undefined
                });
                this.ui.start('#firebaseui-auth-container', this.uiConfig);
            }
        });
    }

    public render() {
        return <>
            {this.state && this.state.userId &&
                <div>
                    {this.state.userId}
                    <p><button type="button" onClick={this.doLogout}>Logout</button></p>
                </div>
            }
            <div id="firebaseui-auth-container" />
        </>;
    }

    private doLogout() {
        firebaseApp.auth().signOut();
    }
}