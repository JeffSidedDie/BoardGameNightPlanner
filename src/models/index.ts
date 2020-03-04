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

export interface EventGroup {
    ownerUserId: string;
    name: string;
    defaultLocation: string;
    defaultDay: number;
    defaultHour: number;
    defaultMinute: number;
    description: string;
    slug: string;
    followerUserIds: string[];
}

export interface Attendee {
    userId: string;
    name: string;
    score?: number;
    winner?: boolean;
}

export interface NewEvent {
    ownerUserId: string;
    eventGroupId: string;
    game: Document<Game>;
    timestamp: firebase.firestore.Timestamp;
    location: string;
    description: string;
    attendees: Attendee[];
}

export type Attendees = { [userId: string]: string };
export type Scores = { [userId: string]: number };

export interface Event {
    game: Document<Game>;
    timestamp: firebase.firestore.Timestamp;
    attendees: Attendees;
    scores?: Scores;
}