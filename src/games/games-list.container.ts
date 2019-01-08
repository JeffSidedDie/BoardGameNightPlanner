import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'src';
import { GameData, GameDocument } from 'src/common/models';
import { AppAction } from 'src/common/redux';
import { GamesListComponent, GamesListComponentProperties } from './games-list.component';
import { saveGame, selectGame, subscribeGames, unsubscribeGames } from './games.actions';

// This is used to translate the state of the page to the props on the component
function mapStateToProps(state: AppState): Partial<GamesListComponentProperties> {
    return {
        error: state.games.error,
        games: state.games.games,
        selectedGame: state.games.selectedGame,
    };
}

// This should create proxy wrappers for actions used by the component
function mapDispatchToProps(dispatch: ThunkDispatch<AppState, {}, AppAction>): Partial<GamesListComponentProperties> {
    return {
        subscribeGames: () => {
            dispatch(subscribeGames());
        },
        unsubscribeGames,
        selectGame: (game: GameDocument) => {
            dispatch(selectGame(game));
        },
        saveGame: (game: GameData, id: string) => {
            dispatch(saveGame(game, id));
        },
    };
}

// Connect function "wires" both of the map functions and returns a wrapper container for the component
export const GamesList = connect(mapStateToProps, mapDispatchToProps)(GamesListComponent);