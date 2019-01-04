import * as firebase from 'firebase';

export interface User {
    displayName: string | null;
    email: string | null;
    isAdmin?: boolean;
}

export interface Game {
    name: string;
    bggLink: string;
    maxPlayers: number;
}

export interface Attendee {
    name: string;
    score?: number;
}

export interface Event {
    id: string;
    timestamp: firebase.firestore.Timestamp;
    attendees: { [userId: string]: Attendee };
    game: Game;
}