declare module "firebaseui" {

    import * as firebase from 'firebase';

    interface IConfig {
        callbacks?: ICallbacks;
        credentialHelper?: auth.CredentialHelper;
        queryParameterForSignInSuccessUrl?: string;
        queryParameterForWidgetMode?: string;
        signInFlow?: 'redirect' | 'popup';
        signInOptions: Array<ISignInOption | string>;
        signInSuccessUrl?: string;
        tosUrl?: string;
    }
    interface ICallbacks {
        signInSuccessWithAuthResult?: (authResult: AuthResult, redirectUrl: string) => boolean;
        uiShown?: () => void;
    }
    interface ISignInOption {
        provider: string;
        scopes?: Array<string>;
        requireDisplayName?: boolean;
    }

    interface AuthResult {
        user?: firebase.User;
        credential?: firebase.auth.AuthCredential;
        operationType?: string;
        additionalUserInfo?: firebase.auth.AdditionalUserInfo;
    }

    namespace auth {
        enum CredentialHelper { ACCOUNT_CHOOSER_COM, NONE }
        class AuthUI {
            constructor(auth: firebase.auth.Auth);
            start(containerCSSselector: string, config: IConfig): void;
        }
    }
}