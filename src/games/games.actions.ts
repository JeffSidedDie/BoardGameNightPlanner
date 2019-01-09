import * as firebase from 'firebase/app';
import { Dispatch } from 'redux';
import { Collections, db } from 'src/common/firebase';
import { GameData, GameDocument } from 'src/common/models';
import { AppAction, AppActionType } from 'src/common/redux';

let gamesListener: () => void;

function handleGamesSnapshot(snapshot: firebase.firestore.QuerySnapshot, action: (games: GameDocument[]) => AppAction) {
    const games: GameDocument[] = [];
    snapshot.docs.forEach(doc => games.push({ id: doc.id, data: doc.data() as GameData }));
    action(games);
}

export function subscribeGames() {
    return (dispatch: Dispatch<AppAction>) => {
        const gamesCollection = db.collection(Collections.Games).orderBy('name', 'asc');
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

export interface GamesUpdatedAction extends AppAction {
    readonly type: AppActionType.Games_GamesUpdated;
    readonly games: GameDocument[];
}

export function gamesUpdated(games: GameDocument[]): GamesUpdatedAction {
    return {
        type: AppActionType.Games_GamesUpdated,
        games,
    };
}

export interface GameSelectedAction extends AppAction {
    readonly type: AppActionType.Games_GameSelected;
    readonly selectedGame: GameDocument;
}

export function selectGame(game: GameDocument): GameSelectedAction {
    return {
        type: AppActionType.Games_GameSelected,
        selectedGame: game,
    };
}

export function saveGame(game: GameData, id?: string) {
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
    readonly game: GameData;
}

export function gameSaved(id: string, game: GameData): GameSavedAction {
    return {
        type: AppActionType.Games_GameSaved,
        id,
        game,
    };
}