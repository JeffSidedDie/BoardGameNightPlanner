import * as firebase from 'firebase/app';
import { Dispatch } from 'redux';
import { Collections, db } from 'src/common/firebase';
import { IEvent } from 'src/common/models';
import { AppActionType, IAppAction } from 'src/common/redux';
import { IAppState } from '..';

let eventsListener: () => void;

export function subscribeEvents() {
    return (dispatch: Dispatch<IAppAction>) => {
        eventsListener = db.collection(Collections.Events).onSnapshot(snaphot => {
            const events: IEvent[] = [];
            snaphot.docs.forEach(doc => events.push({ id: doc.id, ...doc.data() } as IEvent));
            dispatch(eventsUpdated(events));
        }, error => {
            dispatch(eventsError(error.message));
        });
    };
}

export function unsubscribeEvents() {
    eventsListener();
}

export interface IEventsUpdatedAction extends IAppAction {
    readonly type: AppActionType.Events_EventsUpdated;
    readonly events: IEvent[];
}

export function eventsUpdated(events: IEvent[]): IEventsUpdatedAction {
    return {
        events,
        type: AppActionType.Events_EventsUpdated,
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
        await db.collection(Collections.Events).doc(event.id).update(`attendees.${state.auth.userId}`, state.auth.displayName);
    };
}

export function unattendEvent(event: IEvent) {
    return async (dispatch: Dispatch<IAppAction>, getState: () => IAppState) => {
        const state = getState();
        await db.collection(Collections.Events).doc(event.id).update(`attendees.${state.auth.userId}`, firebase.firestore.FieldValue.delete());
    };
}