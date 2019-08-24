declare module 'ics-browser' {

    interface CalendarEvent {
        start: number[];
        end?: number[];
        duration?: Duration;
        title?: string;
        description?: string;
        location?: string;
        geo?: GeoPoint;
        url?: string;
        status?: 'TENTATIVE' | 'CONFIRMED' | 'CANCELLED';
        organizer?: Attendee;
        attendees?: Attendee[];
        categories?: string[];
        // alarms?:string; //not sure what type this is
        productId?: string;
        uid?: string;
    }

    interface Duration {
        weeks?: number;
        days?: number;
        hours?: number;
        minutes?: number;
        seconds?: number;
    }

    interface GeoPoint {
        lat: number;
        lon: number;
    }

    interface Attendee {
        name: string;
        email: string;
        rsvp?: boolean;
    }

    interface IcsFactoryResult {
        error: string | null;
        value: string | null;
    }

    interface IcsFactory {
        createEvent: (event: CalendarEvent) => IcsFactoryResult;
        createEvents: (events: CalendarEvent[]) => IcsFactoryResult;
    }

    const ics: IcsFactory;
    export = ics;
}