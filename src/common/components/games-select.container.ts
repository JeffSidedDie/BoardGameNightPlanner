import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'src';
import { AppAction } from 'src/common/redux';
import { subscribeGames, unsubscribeGames } from 'src/games/games.actions';
import { GamesSelectComponent, GamesSelectComponentProperties } from './games-select.component';

function mapStateToProps<T>(state: AppState, ownProps: GamesSelectComponentProperties<T>): Partial<GamesSelectComponentProperties<T>> {
    return {
        games: state.games.games,
    };
}

function mapDispatchToProps<T>(dispatch: ThunkDispatch<AppState, {}, AppAction>): Partial<GamesSelectComponentProperties<T>> {
    return {
        subscribeGames: () => {
            dispatch(subscribeGames());
        },
        unsubscribeGames,
    };
}

export const GamesSelect = connect(mapStateToProps, mapDispatchToProps)(GamesSelectComponent);