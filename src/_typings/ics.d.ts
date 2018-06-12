declare module "ics-browser" {

    interface ICalendarEvent {
        start: number[];
        end?: number[];
        duration?: IDuration;
        title?: string;
        description?: string;
        location?: string;
        geo?: IGeoPoint;
        url?: string;
        status?: 'TENTATIVE' | 'CONFIRMED' | 'CANCELLED';
        organizer?: IAttendee;
        attendees?: IAttendee[];
        categories?: string[];
        // alarms?:string; //not sure what type this is
        productId?: string;
        uid?: string;
    }

    interface IDuration {
        weeks?: number;
        days?: number;
        hours?: number;
        minutes?: number;
        seconds?: number;
    }

    interface IGeoPoint {
        lat: number;
        lon: number;
    }

    interface IAttendee {
        name: string;
        email: string;
        rsvp?: boolean;
    }

    interface IcsFactoryResult {
        error: string | null;
        value: string | null;
    }

    interface IcsFactory {
        createEvent: (event: ICalendarEvent) => IcsFactoryResult;
        createEvents: (events: ICalendarEvent[]) => IcsFactoryResult;
    }

    const ics: IcsFactory;
    export = ics;
}