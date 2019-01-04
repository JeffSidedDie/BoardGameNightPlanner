import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'src';
import { AppAction } from 'src/common/redux';
import { GamesListComponent, GamesListComponentProperties } from './games-list.component';
import { subscribeGames, unsubscribeGames } from './games.actions';

// This is used to translate the state of the page to the props on the component
function mapStateToProps(state: AppState): Partial<GamesListComponentProperties> {
    return {
        error: state.games.error,
        games: state.games.games,
    };
}

// This should create proxy wrappers for actions used by the component
function mapDispatchToProps(dispatch: ThunkDispatch<AppState, {}, AppAction>): Partial<GamesListComponentProperties> {
    return {
        subscribeGames: () => {
            dispatch(subscribeGames());
        },
        unsubscribeGames,
    };
}

// Connect function "wires" both of the map functions and returns a wrapper container for the component
export const GamesList = connect(mapStateToProps, mapDispatchToProps)(GamesListComponent);