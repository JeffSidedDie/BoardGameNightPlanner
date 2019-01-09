import * as firebase from 'firebase';

export interface User {
    displayName: string | null;
    email: string | null;
    isAdmin?: boolean;
}

export interface GameData {
    name: string;
    bggLink: string;
    maxPlayers: number;
}

export interface GameDocument {
    readonly id: string;
    data: GameData;
}

export interface Attendee {
    name: string;
    score?: number;
}

export interface EventData {
    timestamp: firebase.firestore.Timestamp;
    attendees: { [userId: string]: Attendee };
    game: GameDocument;
}

export interface EventDocument {
    readonly id: string;
    data: EventData;
}