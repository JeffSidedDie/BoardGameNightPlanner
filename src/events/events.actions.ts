import { Dispatch } from 'redux';
import { Collections, db } from 'src/common/firebase';
import { AppActionType, IAppAction } from 'src/common/redux';
import { IEvent } from 'src/models';

let eventsListener: () => void;

export function subscribeEvents() {
    return (dispatch: Dispatch<IAppAction>) => {
        eventsListener = db.collection(Collections.Events).onSnapshot(snaphot => {
            const events: IEvent[] = [];
            snaphot.docs.forEach(doc => events.push(doc.data() as IEvent));
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