import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'src';
import { EventDocument } from 'src/common/models';
import { AppAction } from 'src/common/redux';
import { EventsComponent, EventsComponentProperties } from 'src/events/events.component';
import { attendEvent, subscribeEvents, unattendEvent, unsubscribeEvents } from './events.actions';

// This is used to translate the state of the page to the props on the component
function mapStateToProps(state: AppState): Partial<EventsComponentProperties> {
    return {
        currentUserId: state.auth.userId,
        error: state.events.error,
        recentEvents: state.events.recentEvents,
        upcomingEvents: state.events.upcomingEvents,
    };
}

// This should create proxy wrappers for actions used by the component
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

// Connect function "wires" both of the map functions and returns a wrapper container for the component
export const Events = connect(mapStateToProps, mapDispatchToProps)(EventsComponent);