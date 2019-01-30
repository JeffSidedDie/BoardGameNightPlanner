import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'src';
import { AttendeeDocument, EventDocument } from 'src/common/models';
import { AppAction } from 'src/common/redux';
import { EventsComponent, EventsComponentProperties } from 'src/events/events.component';
import { attendEvent, subscribeEvents, unattendEvent, unsubscribeEvents, updateScore } from './events.actions';

function mapStateToProps(state: AppState): Partial<EventsComponentProperties> {
    return {
        currentUserId: state.auth.userId,
        currentUserIsAdmin: state.auth.isAdmin,
        error: state.events.error,
        recentEvents: state.events.recentEvents,
        upcomingEvents: state.events.upcomingEvents,
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, {}, AppAction>): Partial<EventsComponentProperties> {
    return {
        attendEvent: (event: EventDocument) => {
            dispatch(attendEvent(event));
        },
        subscribeEvents: () => {
            dispatch(subscribeEvents());
        },
        unattendEvent: (event: EventDocument) => {
            dispatch(unattendEvent(event));
        },
        updateScores: (eventId: string, attendees: AttendeeDocument[]) => {
            return dispatch(updateScore(eventId, attendees));
        },
        unsubscribeEvents,
    };
}

export const Events = connect(mapStateToProps, mapDispatchToProps)(EventsComponent);