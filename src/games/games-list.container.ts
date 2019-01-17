import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'src';
import { GameDocument } from 'src/common/models';
import { AppAction } from 'src/common/redux';
import { GamesListComponent, GamesListComponentProperties } from './games-list.component';
import { GameDataWithImage, saveGame, selectGame, subscribeGames, unsubscribeGames } from './games.actions';

function mapStateToProps(state: AppState): Partial<GamesListComponentProperties> {
    return {
        error: state.games.error,
        games: state.games.games,
        selectedGame: state.games.selectedGame,
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, {}, AppAction>): Partial<GamesListComponentProperties> {
    return {
        subscribeGames: () => {
            dispatch(subscribeGames());
        },
        unsubscribeGames,
        selectGame: (game: GameDocument) => {
            dispatch(selectGame(game));
        },
        saveGame: (game: GameDataWithImage, id: string) => {
            dispatch(saveGame(game, id));
        },
    };
}

export const GamesList = connect(mapStateToProps, mapDispatchToProps)(GamesListComponent);