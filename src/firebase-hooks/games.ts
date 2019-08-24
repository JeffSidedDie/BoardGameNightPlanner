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

export interface GameWithMetadata extends Game {
    image?: File;
    updateExistingEvents?: boolean;
}

export async function saveGame(gameWithMetadata: GameWithMetadata, id?: string) {
    const game: Game = {
        name: gameWithMetadata.name,
        bggLink: gameWithMetadata.bggLink,
        maxPlayers: gameWithMetadata.maxPlayers,
        imageLink: gameWithMetadata.imageLink,
    };

    const collection = db.collection(Collections.Games);
    let gameRef: firebase.firestore.DocumentReference;
    if (!id) {
        gameRef = collection.doc();
        id = gameRef.id;
    }

    // Save image
    if (gameWithMetadata.image) {
        const snapshot = await storage.ref(id).put(gameWithMetadata.image);
        const url = await snapshot.ref.getDownloadURL();
        game.imageLink = url;
    }

    // Update game
    await collection.doc(id).set(game);

    if (gameWithMetadata.updateExistingEvents) {
        // Update existing games
        const snapshot = await db.collection(Collections.Events)
            .where('game.id', '==', id)
            .get();
        const batch = db.batch();
        for (const g of snapshot.docs) {
            batch.update(g.ref, 'game.data', game);
        }
        await batch.commit();
    }
}