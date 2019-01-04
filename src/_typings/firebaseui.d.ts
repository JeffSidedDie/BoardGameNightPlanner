declare module "firebaseui" {

    import * as firebase from 'firebase';

    interface Config {
        callbacks?: Callbacks;
        credentialHelper?: auth.CredentialHelper;
        queryParameterForSignInSuccessUrl?: string;
        queryParameterForWidgetMode?: string;
        signInFlow?: 'redirect' | 'popup';
        signInOptions: Array<SignInOption | string>;
        signInSuccessUrl?: string;
        tosUrl?: string;
    }
    interface Callbacks {
        signInSuccessWithAuthResult?: (authResult: AuthResult, redirectUrl: string) => boolean;
        uiShown?: () => void;
    }
    interface SignInOption {
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
            start(containerCSSselector: string, config: Config): void;
        }
    }
}