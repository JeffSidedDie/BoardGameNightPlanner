import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from 'src';
import { IEvent } from 'src/common/models';
import { IAppAction } from 'src/common/redux';
import { EventsComponent, IEventsComponentProperties } from 'src/events/events.component';
import { attendEvent, subscribeEvents, unattendEvent, unsubscribeEvents } from './events.actions';

// This is used to translate the state of the page to the props on the component
function mapStateToProps(state: IAppState): Partial<IEventsComponentProperties> {
    return {
        currentUserId: state.auth.userId,
        error: state.events.error,
        recentEvents: state.events.recentEvents,
        upcomingEvents: state.events.upcomingEvents,
    };
}

// This should create proxy wrappers for actions used by the component
function mapDispatchToProps(dispatch: ThunkDispatch<IAppState, {}, IAppAction>): Partial<IEventsComponentProperties> {
    return {
        attendEvent: (event: IEvent) => {
            dispatch(attendEvent(event));
        },
        subscribeEvents: () => {
            dispatch(subscribeEvents());
        },
        unattendEvent: (event: IEvent) => {
            dispatch(unattendEvent(event));
        },
        unsubscribeEvents,
    };
}

// Connect function "wires" both of the map functions and returns a wrapper container for the component
export const Events = connect(mapStateToProps, mapDispatchToProps)(EventsComponent);