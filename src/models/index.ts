import * as firebase from 'firebase';

export interface IUser {
    displayName: string | null;
    email: string | null;
    isAdmin: boolean;
}

export interface IAttendee {
    displayName: string;
    email: string;
    userId: string;
}

export interface IEvent {
    timestamp: firebase.firestore.Timestamp;
    attendees: IAttendee[];
    maxAttendees: number;
}