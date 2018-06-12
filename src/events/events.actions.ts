import * as FileSaver from 'file-saver';
import * as firebase from 'firebase/app';
import * as ics from 'ics-browser';
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

        // create calendar event
        const eventDate = event.timestamp.toDate();
        const icsResult = ics.createEvent({
            description: `Jeff's Weekly Board Game Night!\nFeatured Game: ${event.game.name}\nBGG Link: ${event.game.bggLink}`,
            duration: { hours: 3 },
            location: '3464 Roxboro Rd NE\, Apt 409\, Atlanta\, GA 30326\, USA',
            start: [eventDate.getFullYear(), eventDate.getMonth() + 1, eventDate.getDate(), 19, 0],
            title: 'Board Game Night',
        });
        if (icsResult.value) {
            const blob = new Blob([icsResult.value], { type: 'text/calendar;charset=utf8' });
            FileSaver.saveAs(blob, `Board Game Night ${eventDate.toDateString()}.ics`);
        }
    };
}

export function unattendEvent(event: IEvent) {
    return async (dispatch: Dispatch<IAppAction>, getState: () => IAppState) => {
        const state = getState();
        await db.collection(Collections.Events).doc(event.id).update(`attendees.${state.auth.userId}`, firebase.firestore.FieldValue.delete());
    };
}