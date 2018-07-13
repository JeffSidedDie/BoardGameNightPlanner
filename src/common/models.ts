import * as firebase from 'firebase';

export interface IUser {
    displayName: string | null;
    email: string | null;
    isAdmin: boolean;
}

export interface IGame {
    name: string;
    bggLink: string;
    maxPlayers: number;
}

export interface IAttendee {
    name: string;
    score?: number;
}

export interface IEvent {
    id: string;
    timestamp: firebase.firestore.Timestamp;
    attendees: { [userId: string]: IAttendee };
    game: IGame;
}