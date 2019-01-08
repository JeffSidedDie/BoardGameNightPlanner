import { EventDocument } from 'src/common/models';
import { createReducer } from 'src/common/redux';
import { AppActionType } from 'src/common/redux';
import { EventsErrorAction, RecentEventsUpdatedAction, UpcomingEventsUpdatedAction } from 'src/events/events.actions';

export interface EventsState {
    readonly error: string;
    readonly recentEvents: EventDocument[];
    readonly upcomingEvents: EventDocument[];
}

const initialState: EventsState = {
    error: '',
    recentEvents: [],
    upcomingEvents: [],
};

function handleEventsError(state: EventsState, action: EventsErrorAction): EventsState {
    return {
        ...state,
        error: action.error,
    };
}

function handleUpcomingEventsUpdated(state: EventsState, action: UpcomingEventsUpdatedAction): EventsState {
    return {
        ...state,
        upcomingEvents: action.upcomingEvents,
    };
}

function handleRecentEventsUpdated(state: EventsState, action: RecentEventsUpdatedAction): EventsState {
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