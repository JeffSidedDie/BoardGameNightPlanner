import { Collections, convertDocument, db, storage } from 'firebase-hooks/common';
import { Document, Game } from 'models';
import { useEffect, useState } from 'react';

export function useGames(): [Document<Game>[], Error | null] {
    const [games, setGames] = useState<Document<Game>[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const gamesListener = db.collection(Collections.Games)
            .orderBy('name', 'asc')
            .onSnapshot(snapshot => {
                setGames(snapshot.docs.map(e => convertDocument(e)));
            }, error => {
                setError(error);
            });
        return function cleanup() {
            gamesListener();
        };
    }, []);

    return [games, error];
}

export interface GameWithImage extends Game {
    image?: File;
}

export async function saveGame(gameWithImage: GameWithImage, id?: string) {
    const game = { ...gameWithImage };
    delete game.image; // doing it this way to future proof against future GameData fields

    const collection = db.collection(Collections.Games);
    if (id) {
        await collection.doc(id).set(game);
    } else {
        const gameRef = await collection.add(game);
        id = gameRef.id;
    }

    if (gameWithImage.image) {
        storage.ref(id).put(gameWithImage.image);
    }
}