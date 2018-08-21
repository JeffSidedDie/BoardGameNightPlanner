import { IEvent } from 'src/common/models';
import { createReducer } from 'src/common/redux';
import { AppActionType } from 'src/common/redux';
import { IEventsErrorAction, IRecentEventsUpdatedAction, IUpcomingEventsUpdatedAction } from 'src/events/events.actions';

export interface IEventsState {
    readonly error: string;
    readonly recentEvents: IEvent[];
    readonly upcomingEvents: IEvent[];
}

const initialState: IEventsState = {
    error: '',
    recentEvents: [],
    upcomingEvents: [],
};

function handleEventsError(state: IEventsState, action: IEventsErrorAction): IEventsState {
    return {
        ...state,
        error: action.error,
    };
}

function handleUpcomingEventsUpdated(state: IEventsState, action: IUpcomingEventsUpdatedAction): IEventsState {
    return {
        ...state,
        upcomingEvents: action.upcomingEvents,
    };
}

function handleRecentEventsUpdated(state: IEventsState, action: IRecentEventsUpdatedAction): IEventsState {
    return {
        ...state,
        recentEvents: action.recentEvents,
    };
}

export const EventsReducer = createReducer(initialState, {
    [AppActionType.Events_Error]: handleEventsError,
    [AppActionType.Events_UpcomingEventsUpdated]: handleUpcomingEventsUpdated,
    [AppActionType.Events_RecentEventsUpdated]: handleRecentEventsUpdated,
});