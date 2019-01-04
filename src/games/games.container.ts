import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'src';
import { Game } from 'src/common/models';
import { AppAction } from 'src/common/redux';
import { loadGame, saveGame } from './games.actions';
import { GamesComponent, GamesComponentProperties } from './games.component';

// This is used to translate the state of the page to the props on the component
function mapStateToProps(state: AppState): Partial<GamesComponentProperties> {
    return {
        currentGame: state.games.currentGame,
    };
}

// This should create proxy wrappers for actions used by the component
function mapDispatchToProps(dispatch: ThunkDispatch<AppState, {}, AppAction>): Partial<GamesComponentProperties> {
    return {
        loadGame: (id: string) => {
            dispatch(loadGame(id));
        },
        saveGame: (game: Game, id?: string) => {
            dispatch(saveGame(game, id));
        },
    };
}

// Connect function "wires" both of the map functions and returns a wrapper container for the component
export const Games = connect(mapStateToProps, mapDispatchToProps)(GamesComponent);