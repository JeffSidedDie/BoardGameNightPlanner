import { history } from 'src';
import { auth, firebaseUiAuthStart } from 'src/common/firebase';
import { AppActionType, IAppAction } from 'src/common/redux';
import { Routes } from '../common/routes';

export interface IAuthLogoutAction extends IAppAction {
    readonly type: AppActionType.Auth_Logout;
}

export function logout(): IAuthLogoutAction {
    auth.signOut();

    return {
        type: AppActionType.Auth_Logout
    };
}

export interface IAuthLoginStartAction extends IAppAction {
    readonly type: AppActionType.Auth_LoginStart;
}

export function loginStart(elementId: string): IAuthLoginStartAction {
    firebaseUiAuthStart(elementId);
    return {
        type: AppActionType.Auth_LoginStart,
    };
}

export interface IAuthLoginSuccessAction extends IAppAction {
    readonly type: AppActionType.Auth_LoginSuccess;
    readonly userId: string;
    readonly displayName: string;
    readonly email: string;
}

export function loginSuccess(userId: string, displayName: string, email: string): IAuthLoginSuccessAction {
    history.push(Routes.Events);
    return {
        displayName,
        email,
        type: AppActionType.Auth_LoginSuccess,
        userId,
    };
}