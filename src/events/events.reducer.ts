import { createReducer } from 'src/common/redux';
import { AppActionType } from 'src/common/redux';
import { IEventsErrorAction, IEventsUpdatedAction } from 'src/events/events.actions';
import { IEvent } from 'src/models';

export interface IEventsState {
    readonly error: string;
    readonly events: IEvent[];
}

const initialState: IEventsState = {
    error: '',
    events: [],
};

function handleEventsError(state: IEventsState, action: IEventsErrorAction) {
    return {
        ...state,
        error: action.error,
    };
}

function handleEventsUpdated(state: IEventsState, action: IEventsUpdatedAction) {
    return {
        ...state,
        events: action.events,
    };
}

export const EventsReducer = createReducer(initialState, {
    [AppActionType.Events_Error]: handleEventsError,
    [AppActionType.Events_EventsUpdated]: handleEventsUpdated,
});