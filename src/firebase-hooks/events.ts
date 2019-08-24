import * as firebase from 'firebase';
import { Collections, convertDocument, db } from 'firebase-hooks/common';
import { Document, Event, User, Attendee } from 'models';
import { useEffect, useState } from 'react';

export function useMyEvents(user: Document<User>, page: number): [Document<Event>[], Error | null] {
    const [myEvents, setMyEvents] = useState<Document<Event>[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const myEventsListener = db.collection(Collections.Events)
            .where(`attendees.${user.id}`, '==', user.data.displayName)
            .where('timestamp', '<', new Date())
            .limit(3)
            .onSnapshot(snapshot => {
                setMyEvents(snapshot.docs.map(e => convertDocument(e)));
            }, error => {
                setError(error);
            });
        return function cleanup() {
            myEventsListener();
        };
    }, []);

    return [myEvents, error];
}

export function useUpcomingEvents(): [Document<Event>[], Error | null] {
    const [upcomingEvents, setUpcomingEvents] = useState<Document<Event>[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const upcomingEventsListener = db.collection(Collections.Events)
            .where('timestamp', '>=', new Date())
            .orderBy('timestamp')
            .limit(3)
            .onSnapshot(snapshot => {
                setUpcomingEvents(snapshot.docs.map(e => convertDocument(e)));
            }, error => {
                setError(error);
            });
        return function cleanup() {
            upcomingEventsListener();
        };
    }, []);

    return [upcomingEvents, error];
}

export function useRecentEvents(): [Document<Event>[], Error | null] {
    const [recentEvents, setRecentEvents] = useState<Document<Event>[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const recentEventsListener = db.collection(Collections.Events)
            .where('timestamp', '<', new Date())
            .orderBy('timestamp', 'desc')
            .limit(3)
            .onSnapshot(snapshot => {
                setRecentEvents(snapshot.docs.map(e => convertDocument(e)));
            }, error => {
                setError(error);
            });
        return function cleanup() {
            recentEventsListener();
        };
    }, []);

    return [recentEvents, error];
}

export async function attendEvent(eventId: string, user: Document<User>) {
    await db.collection(Collections.Events).doc(eventId).update(`attendees.${user.id}`, { name: user.data.displayName });
}

export async function unattendEvent(eventId: string, userId: string) {
    await db.collection(Collections.Events).doc(eventId).update(`attendees.${userId}`, firebase.firestore.FieldValue.delete());
}

export async function updateScores(eventId: string, attendees: Document<Attendee>[]) {
    const updatedScores: { [field: string]: number | undefined } = {};
    attendees.forEach((a, i) => updatedScores[`attendees.${a.id}.score`] = a.data.score);
    await db.collection(Collections.Events).doc(eventId).update(updatedScores);
}