import * as firebase from 'firebase/app';
import { Dispatch } from 'redux';
import { Collections, db } from 'src/common/firebase';
import { AttendeeDocument, EventDocument } from 'src/common/models';
import { AppAction, AppActionType } from 'src/common/redux';
import { AppState } from '..';

let upcomingEventsListener: () => void;
let recentEventsListener: () => void;

function handleEventsSnapshot(snapshot: firebase.firestore.QuerySnapshot, action: (events: EventDocument[]) => AppAction) {
    const events: EventDocument[] = [];
    snapshot.docs.forEach(doc => events.push({ id: doc.id, data: doc.data() } as EventDocument));
    action(events);
}

export function subscribeEvents() {
    return (dispatch: Dispatch<AppAction>) => {
        const eventsCollection = db.collection(Collections.Events);
        upcomingEventsListener = eventsCollection.where('timestamp', '>=', new Date()).orderBy('timestamp').limit(3).onSnapshot(snapshot => {
            handleEventsSnapshot(snapshot, e => dispatch(upcomingEventsUpdated(e)));
        }, error => {
            dispatch(eventsError(error.message));
        });
        recentEventsListener = eventsCollection.where('timestamp', '<', new Date()).orderBy('timestamp', 'desc').limit(3).onSnapshot(snapshot => {
            handleEventsSnapshot(snapshot, e => dispatch(recentEventsUpdated(e)));
        }, error => {
            dispatch(eventsError(error.message));
        });
    };
}

export function unsubscribeEvents() {
    upcomingEventsListener();
    recentEventsListener();
}

export interface UpcomingEventsUpdatedAction extends AppAction {
    readonly type: AppActionType.Events_UpcomingEventsUpdated;
    readonly upcomingEvents: EventDocument[];
}

export function upcomingEventsUpdated(upcomingEvents: EventDocument[]): UpcomingEventsUpdatedAction {
    return {
        type: AppActionType.Events_UpcomingEventsUpdated,
        upcomingEvents,
    };
}

export interface RecentEventsUpdatedAction extends AppAction {
    readonly type: AppActionType.Events_RecentEventsUpdated;
    readonly recentEvents: EventDocument[];
}

export function recentEventsUpdated(recentEvents: EventDocument[]): RecentEventsUpdatedAction {
    return {
        type: AppActionType.Events_RecentEventsUpdated,
        recentEvents,
    };
}

export interface EventsErrorAction extends AppAction {
    readonly type: AppActionType.Events_Error;
    readonly error: string;
}

export function eventsError(error: string): EventsErrorAction {
    return {
        type: AppActionType.Events_Error,
        error,
    };
}

export function attendEvent(event: EventDocument) {
    return async (dispatch: Dispatch<AppAction>, getState: () => AppState) => {
        const state = getState();
        await db.collection(Collections.Events).doc(event.id).update(`attendees.${state.auth.userId}`, { name: state.auth.displayName });
    };
}

export function unattendEvent(event: EventDocument) {
    return async (dispatch: Dispatch<AppAction>, getState: () => AppState) => {
        const state = getState();
        await db.collection(Collections.Events).doc(event.id).update(`attendees.${state.auth.userId}`, firebase.firestore.FieldValue.delete());
    };
}

export function updateScore(eventId: string, attendees: AttendeeDocument[]) {
    return async (dispatch: Dispatch<AppAction>) => {
        const updatedScores: { [field: string]: number | undefined } = {};
        attendees.forEach((a, i) => updatedScores[`attendees.${a.id}.score`] = a.data.score);
        await db.collection(Collections.Events).doc(eventId).update(updatedScores);
    };
}