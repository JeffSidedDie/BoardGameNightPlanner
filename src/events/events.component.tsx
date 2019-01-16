import '@fortawesome/fontawesome-free/css/all.css';
import './events.css';

import * as React from 'react';
import { EventDocument } from 'src/common/models';
import { RecentEventCard } from './recent-event-card';
import { UpcomingEventCard } from './upcoming-event-card';

export interface EventsComponentProperties {
    readonly currentUserId: string;
    readonly error?: string;
    readonly recentEvents?: EventDocument[];
    readonly upcomingEvents?: EventDocument[];
    readonly attendEvent: (event: EventDocument) => void;
    readonly unattendEvent: (event: EventDocument) => void;
    readonly addToCalendarEvent: (event: EventDocument) => void;
    readonly subscribeEvents: () => void;
    readonly unsubscribeEvents: () => void;
}

export class EventsComponent extends React.Component<EventsComponentProperties> {

    public componentDidMount() {
        this.props.subscribeEvents();
    }

    public componentWillUnmount() {
        this.props.unsubscribeEvents();
    }

    public render() {
        return (
          <section className="section">
            <div className="container">
              <h1 className="title">Upcoming Events</h1>
              <div className="columns">
                {this.props.upcomingEvents && this.props.upcomingEvents.map((event, index) =>
                    <UpcomingEventCard key={index}
                        event={event}
                        currentUserId={this.props.currentUserId}
                        attendEvent={this.props.attendEvent}
                        unattendEvent={this.props.unattendEvent}
                    />
                )}
              </div>
              <h1 className="title">Recent Events</h1>
              <div className="columns">
                {this.props.recentEvents && this.props.recentEvents.map((event, index) =>
                    <RecentEventCard key={index}
                        event={event}
                        currentUserId={this.props.currentUserId}
                    />
                )}
              </div>
              <span>{this.props.error}</span>
            </div>
          </section>
        );
    }
}