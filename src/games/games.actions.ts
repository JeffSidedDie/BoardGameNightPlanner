import * as firebase from 'firebase/app';
import { Dispatch } from 'redux';
import { Collections, db } from 'src/common/firebase';
import { Game, GameListElement } from 'src/common/models';
import { AppAction, AppActionType } from 'src/common/redux';

let gamesListener: () => void;

function handleGamesSnapshot(snapshot: firebase.firestore.QuerySnapshot, action: (games: GameListElement[]) => AppAction) {
    const games: GameListElement[] = [];
    snapshot.docs.forEach(doc => games.push({ id: doc.id, data: doc.data() as Game }));
    action(games);
}

export function subscribeGames() {
    return (dispatch: Dispatch<AppAction>) => {
        const gamesCollection = db.collection(Collections.Games);
        gamesListener = gamesCollection.onSnapshot(snapshot => {
            handleGamesSnapshot(snapshot, e => dispatch(gamesUpdated(e)));
        }, error => {
            dispatch(gamesError(error.message));
        });
    };
}

export function unsubscribeGames() {
    gamesListener();
}

export interface GamesUpdatedAction extends AppAction {
    readonly type: AppActionType.Games_GamesUpdated;
    readonly games: GameListElement[];
}

export function gamesUpdated(games: GameListElement[]): GamesUpdatedAction {
    return {
        type: AppActionType.Games_GamesUpdated,
        games,
    };
}

export interface GamesErrorAction extends AppAction {
    readonly type: AppActionType.Games_Error;
    readonly error: string;
}

export function gamesError(error: string): GamesErrorAction {
    return {
        type: AppActionType.Games_Error,
        error,
    };
}

export function saveGame(game: Game, id?: string) {
    return async (dispatch: Dispatch<AppAction>) => {
        const collection = db.collection(Collections.Games);
        if (id) {
            await collection.doc(id).set(game);
            dispatch(gameSaved(id, game));
        } else {
            const gameRef = await collection.add(game);
            dispatch(gameSaved(gameRef.id, game));
        }
    };
}

export interface GameSavedAction extends AppAction {
    readonly type: AppActionType.Games_GameSaved;
    readonly id: string;
    readonly game: Game;
}

export function gameSaved(id: string, game: Game): GameSavedAction {
    return {
        type: AppActionType.Games_GameSaved,
        id,
        game,
    };
}

export function loadGame(id: string) {
    return async (dispatch: Dispatch<AppAction>) => {
        const gameRef = await db.collection(Collections.Games).doc(id).get();
        dispatch(gameLoaded(gameRef.id, gameRef.data() as Game));
    };
}

export interface GameLoadedAction extends AppAction {
    readonly type: AppActionType.Games_GameLoaded;
    readonly id: string;
    readonly game: Game;
}

export function gameLoaded(id: string, game: Game): GameLoadedAction {
    return {
        type: AppActionType.Games_GameLoaded,
        id,
        game,
    };
}