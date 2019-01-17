import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'src';
import { EventDocument } from 'src/common/models';
import { AppAction } from 'src/common/redux';
import { EventsComponent, EventsComponentProperties } from 'src/events/events.component';
import { attendEvent, subscribeEvents, unattendEvent, unsubscribeEvents } from './events.actions';

function mapStateToProps(state: AppState): Partial<EventsComponentProperties> {
    return {
        currentUserId: state.auth.userId,
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
        unsubscribeEvents,
    };
}

export const Events = connect(mapStateToProps, mapDispatchToProps)(EventsComponent);