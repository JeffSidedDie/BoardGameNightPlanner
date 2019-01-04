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
    Events_UpcomingEventsUpdated = 'Events_UpcomingEventsUpdated',
    Events_RecentEventsUpdated = 'Events_RecentEventsUpdated',
    Events_Error = 'Events_Error',
}

export interface AppAction extends Action {
    readonly type: AppActionType;
}