import { createReducer } from 'src/common/redux';
import { AppActionType } from 'src/common/redux';
import { AuthLoginStartAction, AuthLoginSuccessAction, AuthLogoutAction } from './auth.actions';

export interface AuthState {
    readonly userId?: string;
    readonly displayName?: string;
    readonly email?: string;
    readonly isAdmin?: boolean;
}

const initialState: AuthState = {
    userId: undefined,
};

function handleLogout(state: AuthState, action: AuthLogoutAction) {
    return {
        ...state,
        userId: undefined,
    };
}

function handleLoginStart(state: AuthState, action: AuthLoginStartAction) {
    return {
        ...state,
    };
}

function handleLoginSuccess(state: AuthState, action: AuthLoginSuccessAction) {
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