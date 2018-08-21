import * as firebase from 'firebase/app';
import { Dispatch } from 'redux';
import { Collections, db } from 'src/common/firebase';
import { IEvent } from 'src/common/models';
import { AppActionType, IAppAction } from 'src/common/redux';
import { IAppState } from '..';

let upcomingEventsListener: () => void;
let recentEventsListener: () => void;

function handleEventsSnapshot(snapshot: firebase.firestore.QuerySnapshot, action: (events: IEvent[]) => IAppAction) {
    const events: IEvent[] = [];
    snapshot.docs.forEach(doc => events.push({ id: doc.id, ...doc.data() } as IEvent));
    action(events);
}

export function subscribeEvents() {
    return (dispatch: Dispatch<IAppAction>) => {
        const eventsCollection = db.collection(Collections.Events);
        upcomingEventsListener = eventsCollection.where('timestamp', '>=', new Date()).orderBy('timestamp').onSnapshot(snapshot => {
            handleEventsSnapshot(snapshot, e => dispatch(upcomingEventsUpdated(e)));
        }, error => {
            dispatch(eventsError(error.message));
        });
        recentEventsListener = eventsCollection.where('timestamp', '<', new Date()).orderBy('timestamp', 'desc').limit(4).onSnapshot(snapshot => {
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

export interface IUpcomingEventsUpdatedAction extends IAppAction {
    readonly type: AppActionType.Events_UpcomingEventsUpdated;
    readonly upcomingEvents: IEvent[];
}

export function upcomingEventsUpdated(upcomingEvents: IEvent[]): IUpcomingEventsUpdatedAction {
    return {
        type: AppActionType.Events_UpcomingEventsUpdated,
        upcomingEvents,
    };
}

export interface IRecentEventsUpdatedAction extends IAppAction {
    readonly type: AppActionType.Events_RecentEventsUpdated;
    readonly recentEvents: IEvent[];
}

export function recentEventsUpdated(recentEvents: IEvent[]): IRecentEventsUpdatedAction {
    return {
        recentEvents,
        type: AppActionType.Events_RecentEventsUpdated,
    };
}

export interface IEventsErrorAction extends IAppAction {
    readonly type: AppActionType.Events_Error;
    readonly error: string;
}

export function eventsError(error: string): IEventsErrorAction {
    return {
        error,
        type: AppActionType.Events_Error,
    };
}

export function attendEvent(event: IEvent) {
    return async (dispatch: Dispatch<IAppAction>, getState: () => IAppState) => {
        const state = getState();
        await db.collection(Collections.Events).doc(event.id).update(`attendees.${state.auth.userId}`, { name: state.auth.displayName });
    };
}

export function unattendEvent(event: IEvent) {
    return async (dispatch: Dispatch<IAppAction>, getState: () => IAppState) => {
        const state = getState();
        await db.collection(Collections.Events).doc(event.id).update(`attendees.${state.auth.userId}`, firebase.firestore.FieldValue.delete());
    };
}