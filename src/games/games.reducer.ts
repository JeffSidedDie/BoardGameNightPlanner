import { GameDocument } from 'src/common/models';
import { createReducer } from 'src/common/redux';
import { AppActionType } from 'src/common/redux';
import { GameSavedAction, GameSelectedAction, GamesErrorAction, GamesUpdatedAction } from './games.actions';

export interface GamesState {
    readonly error: string;
    readonly games: GameDocument[];
    readonly selectedGame?: GameDocument;
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

function handleGameSelected(state: GamesState, action: GameSelectedAction): GamesState {
    return {
        ...state,
        selectedGame: action.selectedGame,
    };
}

function handleGameSaved(state: GamesState, action: GameSavedAction): GamesState {
    return {
        ...state,
        selectedGame: undefined,
    };
}

export const GamesReducer = createReducer(initialState, {
    [AppActionType.Games_Error]: handleGamesError,
    [AppActionType.Games_GamesUpdated]: handleGamesUpdated,
    [AppActionType.Games_GameSelected]: handleGameSelected,
    [AppActionType.Games_GameSaved]: handleGameSaved,
});