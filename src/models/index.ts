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

export type Attendees = { [userId: string]: string };
export type Scores = { [userId: string]: number };

export interface Event {
    game: Document<Game>;
    timestamp: firebase.firestore.Timestamp;
    attendees: Attendees;
    scores?: Scores;
}