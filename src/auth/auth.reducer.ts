import { IAuthLoginStartAction, IAuthLoginSuccessAction, IAuthLogoutAction } from 'src/auth/auth.actions';
import { createReducer } from 'src/common/redux';
import { AppActionType } from 'src/common/redux';

export interface IAuthState {
    readonly userId?: string;
    readonly displayName?: string;
    readonly email?: string;
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
        userId: action.userId,
    };
}

export const AuthReducer = createReducer(initialState, {
    [AppActionType.Auth_Logout]: handleLogout,
    [AppActionType.Auth_LoginStart]: handleLoginStart,
    [AppActionType.Auth_LoginSuccess]: handleLoginSuccess,
});