import { Action } from 'redux';

export function createReducer<TState, TActionType extends string>(initialState: TState, handlers: { [T in TActionType]: (state: TState, action: Action) => TState }) {
    return function reducer(state: TState = initialState, action: Action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    };
}

export enum AppActionType {
    Auth_Logout = 'Auth_Logout',
    Auth_LoginStart = 'Auth_LoginStart',
    Auth_LoginSuccess = 'Auth_LoginSuccess',
}

export interface IAppAction extends Action {
    readonly type: AppActionType;
}