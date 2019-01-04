import { auth, firebaseUiAuthStart } from 'src/common/firebase';
import { AppAction, AppActionType } from 'src/common/redux';

export interface AuthLogoutAction extends AppAction {
    readonly type: AppActionType.Auth_Logout;
}

export function logout(): AuthLogoutAction {
    auth.signOut();
    return {
        type: AppActionType.Auth_Logout
    };
}

export interface AuthLoginStartAction extends AppAction {
    readonly type: AppActionType.Auth_LoginStart;
}

export function loginStart(elementId: string): AuthLoginStartAction {
    firebaseUiAuthStart(elementId);
    return {
        type: AppActionType.Auth_LoginStart,
    };
}

export interface AuthLoginSuccessAction extends AppAction {
    readonly type: AppActionType.Auth_LoginSuccess;
    readonly userId: string;
    readonly displayName: string;
    readonly email: string;
    readonly isAdmin: boolean;
}

export function loginSuccess(userId: string, displayName: string, email: string, isAdmin: boolean): AuthLoginSuccessAction {
    return {
        type: AppActionType.Auth_LoginSuccess,
        userId,
        displayName,
        email,
        isAdmin,
    };
}