import * as firebase from 'firebase';

export interface User {
    displayName: string | null;
    email: string | null;
    isAdmin?: boolean;
}

export interface Document<T> {
    readonly id: string;
    data: T;
}

export interface GameData {
    name: string;
    bggLink: string;
    maxPlayers: number;
}

export interface GameDocument extends Document<GameData> { }

export interface AttendeeData {
    name: string;
    score?: number;
}
export interface AttendeeDocument extends Document<AttendeeData> { }

export interface EventData {
    timestamp: firebase.firestore.Timestamp;
    attendees: { [userId: string]: AttendeeData };
    game: GameDocument;
}

export interface EventDocument extends Document<EventData> { }