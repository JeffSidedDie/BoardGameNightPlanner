import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from 'src';
import { IAppAction } from 'src/common/redux';
import { EventsComponent, IEventsComponentProperties } from 'src/events/events.component';
import { subscribeEvents, unsubscribeEvents } from './events.actions';

// This is used to translate the state of the page to the props on the component
function mapStateToProps(state: IAppState): Partial<IEventsComponentProperties> {
    return {
        currentUserId: state.auth.userId,
        error: state.events.error,
        events: state.events.events,
    };
}

// This should create proxy wrappers for actions used by the component
function mapDispatchToProps(dispatch: ThunkDispatch<IAppState, {}, IAppAction>): Partial<IEventsComponentProperties> {
    return {
        subscribeEvents: () => {
            dispatch(subscribeEvents());
        },
        unsubscribeEvents,
    };
}

// Connect function "wires" both of the map functions and returns a wrapper container for the component
export const Events = connect(mapStateToProps, mapDispatchToProps)(EventsComponent);