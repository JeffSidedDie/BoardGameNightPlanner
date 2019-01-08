import '@fortawesome/fontawesome-free/css/all.css';
import * as FileSaver from 'file-saver';
import * as ics from 'ics-browser';
import * as React from 'react';
import { EventDocument } from 'src/common/models';
import './events.css';

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
        return <>
            <h1>Upcoming Events</h1>
            <div className="events-grid">
                {this.props.upcomingEvents && this.renderEventsCards(this.props.upcomingEvents)}
            </div>
            <h1>Recent Events</h1>
            {this.renderEventsTable(this.props.recentEvents)}
            <span>{this.props.error}</span>
        </>;
    }

    private renderEventsTable(events?: EventDocument[]) {
        return <table>
            <thead>
                <tr>
                    <th>Timestamp</th>
                    <th>Game</th>
                    <th>Attendees</th>
                    <th>Open Seats</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {events && this.renderEventsRows(events)}
            </tbody>
        </table>;
    }

    private renderEventsCards(events: EventDocument[]) {
        return events.map((e, index) => {
            const keys = Object.keys(e.data.attendees);
            const openSeats = e.data.game.maxPlayers - keys.length;
            const timestamp = e.data.timestamp.toDate();
            const timestampMidnight = timestamp;
            timestampMidnight.setHours(0, 0, 0, 0);
            const now = new Date();
            return <div className="four columns" key={index}>
                <h4>{e.data.game.name}</h4>
                <p>{timestamp.toDateString()}</p>
                <p>Open Seats:{openSeats}</p>
                <div>
                    {timestampMidnight > now && (!e.data.attendees[this.props.currentUserId] && openSeats > 0
                        ? <button type="button" className="button-primary" onClick={this.attendEvent(e)}>Attend</button>
                        : <div>
                            <button type="button" onClick={this.unattendEvent(e)}>Unattend</button>
                            <button type="button" className="button-fa" onClick={this.addToCalendarEvent(e)}><i className="fas fa-calendar-plus fa-2x" /></button>
                        </div>)}
                </div>
            </div>;
        });
    }

    private renderEventsRows(events: EventDocument[]) {
        // events.sort((e1, e2) => e2.timestamp.toMillis() - e1.timestamp.toMillis());
        return events.map((e, index) => {
            const keys = Object.keys(e.data.attendees);
            const attendees = keys.map(k => e.data.attendees[k]).sort((a1, a2) => {
                if (a1.score !== undefined && a2.score !== undefined) {
                    return a2.score - a1.score;
                } else {
                    return a1.name.localeCompare(a2.name);
                }
            });
            const openSeats = e.data.game.maxPlayers - keys.length;
            const timestamp = e.data.timestamp.toDate();
            const timestampMidnight = timestamp;
            timestampMidnight.setHours(0, 0, 0, 0);
            const now = new Date();
            return <tr key={index}>
                <td>{timestamp.toDateString()}</td>
                <td><a href={e.data.game.bggLink} target="_blank">{e.data.game.name}</a></td>
                <td>{attendees.map((a, i) => (<span key={i}>{a.name}{a.score ? `: ${a.score}` : ''}<br /></span>))}</td>
                <td>{openSeats}</td>
                <td>{timestampMidnight > now && (!e.data.attendees[this.props.currentUserId] && openSeats > 0
                    ? <button type="button" onClick={this.attendEvent(e)}>Attend</button>
                    : <div><button type="button" onClick={this.unattendEvent(e)}>Unattend</button><button type="button" onClick={this.addToCalendarEvent(e)}>Add to Calendar</button></div>)}
                </td>
            </tr>;
        });
    }

    private attendEvent(event: EventDocument) {
        return () => this.props.attendEvent(event);
    }

    private unattendEvent(event: EventDocument) {
        return () => this.props.unattendEvent(event);
    }

    private addToCalendarEvent(event: EventDocument) {
        return () => {
            // create calendar event
            const eventDate = event.data.timestamp.toDate();
            const icsResult = ics.createEvent({
                description: `Jeff's Weekly Board Game Night!\nFeatured Game: ${event.data.game.name}\nBGG Link: ${event.data.game.bggLink}`,
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
}