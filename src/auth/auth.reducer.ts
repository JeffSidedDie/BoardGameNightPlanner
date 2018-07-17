import { createReducer } from 'src/common/redux';
import { AppActionType } from 'src/common/redux';
import { IAuthLoginStartAction, IAuthLoginSuccessAction, IAuthLogoutAction } from './auth.actions';

export interface IAuthState {
    readonly userId?: string;
    readonly displayName?: string;
    readonly email?: string;
    readonly isAdmin?: boolean;
}

const initialState: IAuthState = {
    userId: undefined,
};

function handleLogout(state: IAuthState, action: IAuthLogoutAction) {
    return {
        ...state,
        userId: undefined,
    };
}

function handleLoginStart(state: IAuthState, action: IAuthLoginStartAction) {
    return {
        ...state,
    };
}

function handleLoginSuccess(state: IAuthState, action: IAuthLoginSuccessAction) {
    return {
        ...state,
        displayName: action.displayName,
        email: action.email,
        isAdmin: action.isAdmin,
        userId: action.userId,
    };
}

export const AuthReducer = createReducer(initialState, {
    [AppActionType.Auth_Logout]: handleLogout,
    [AppActionType.Auth_LoginStart]: handleLoginStart,
    [AppActionType.Auth_LoginSuccess]: handleLoginSuccess,
});