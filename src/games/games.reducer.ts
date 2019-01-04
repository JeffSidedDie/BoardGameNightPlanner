import { Game, GameListElement } from 'src/common/models';
import { createReducer } from 'src/common/redux';
import { AppActionType } from 'src/common/redux';
import { GameLoadedAction, GameSavedAction, GamesErrorAction, GamesUpdatedAction } from './games.actions';

export interface GamesState {
    readonly error: string;
    readonly games: GameListElement[];
    readonly currentGame?: Game;
}

const initialState: GamesState = {
    error: '',
    games: [],
};

function handleGamesError(state: GamesState, action: GamesErrorAction): GamesState {
    return {
        ...state,
        error: action.error,
    };
}

function handleGamesUpdated(state: GamesState, action: GamesUpdatedAction): GamesState {
    return {
        ...state,
        games: action.games,
    };
}

function handleGameLoaded(state: GamesState, action: GameLoadedAction): GamesState {
    return {
        ...state,
        currentGame: action.game,
    };
}

function handleGamesSaved(state: GamesState, action: GameSavedAction): GamesState {
    return {
        ...state,
        currentGame: action.game,
    };
}

export const GamesReducer = createReducer(initialState, {
    [AppActionType.Games_Error]: handleGamesError,
    [AppActionType.Games_GamesUpdated]: handleGamesUpdated,
    [AppActionType.Games_GameLoaded]: handleGameLoaded,
    [AppActionType.Games_GameSaved]: handleGamesSaved,
});