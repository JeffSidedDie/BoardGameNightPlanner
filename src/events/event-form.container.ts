import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'src';
import { EventData } from 'src/common/models';
import { AppAction } from 'src/common/redux';
import { subscribeGames, unsubscribeGames } from 'src/games/games.actions';
import { EventFormComponent, EventFormComponentProperties } from './event-form.component';

function mapStateToProps(state: AppState): Partial<EventFormComponentProperties> {
    return {
        event: state.events.selectedEvent,
        games: state.games.games,
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, {}, AppAction>): Partial<EventFormComponentProperties> {
    return {
        saveEvent: (event: EventData, id?: string) => {
            return new Promise(() => { return; });
        },
        subscribeGames: () => {
            dispatch(subscribeGames());
        },
        unsubscribeGames,
    };
}

export const EventForm = connect(mapStateToProps, mapDispatchToProps)(EventFormComponent);