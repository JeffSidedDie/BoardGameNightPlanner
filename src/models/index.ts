export interface Document<T> {
    readonly id: string;
    data: T;
}

export interface User {
    displayName: string | null;
    email: string | null;
    isAdmin?: boolean;
}

export interface Game {
    name: string;
    bggLink: string;
    maxPlayers: number;
    imageLink?: string;
}

export interface Attendee {
    name: string;
    score?: number;
}

export interface Event {
    timestamp: firebase.firestore.Timestamp;
    attendees: { [userId: string]: Attendee };
    game: Document<Game>;
}