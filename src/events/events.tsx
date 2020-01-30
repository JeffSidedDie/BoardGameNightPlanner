import '@fortawesome/fontawesome-free/css/all.css';
import './events.css';

import * as React from 'react';
import { Document, User } from 'models';
import { RecentEventCard } from './recent-event-card';
import { UpcomingEventCard } from './upcoming-event-card';
import { useUpcomingEvents, useRecentEvents } from 'firebase-hooks/events';

export interface EventsProperties {
    readonly user: Document<User>;
}

export const Events: React.FC<EventsProperties> = (props) => {
    const [upcomingEvents, upcomingEventsError] = useUpcomingEvents();
    const [recentEvents, recentEventsError] = useRecentEvents();

    return <section className="section">
        <div className="container">
            <h1 className="title">Upcoming Events</h1>
            <div className="columns">
                {upcomingEvents.map((event, index) =>
                    <div className="column is-one-third" key={index}>
                        <UpcomingEventCard
                            event={event}
                            user={props.user}
                        />
                    </div>
                )}
            </div>
            <span>{upcomingEventsError}</span>

            <h1 className="title">Recent Events</h1>
            <div className="columns">
                {recentEvents.map((event, index) =>
                    <div className="column is-one-third" key={index}>
                        <RecentEventCard
                            event={event}
                            user={props.user}
                        />
                    </div>
                )}
            </div>
            <span>{recentEventsError}</span>
        </div>
    </section>;
}
Events.whyDidYouRender = true;