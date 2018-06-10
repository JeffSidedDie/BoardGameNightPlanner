import { firebaseApp, firebaseUiAuthStart } from "src/firebase";
import { AppActionType, IAppAction } from "../common/redux";

export interface IAuthLogoutAction extends IAppAction {
    readonly type: AppActionType.Auth_Logout;
}

export function logout(): IAuthLogoutAction {
    firebaseApp.auth().signOut();

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
}

export function loginSuccess(userId: string): IAuthLoginSuccessAction {
    return {
        type: AppActionType.Auth_LoginSuccess,
        userId,
    };
}