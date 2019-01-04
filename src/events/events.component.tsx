import * as FileSaver from 'file-saver';
import * as ics from 'ics-browser';
import * as React from 'react';
import { Event } from 'src/common/models';


export interface EventsComponentProperties {
    readonly currentUserId: string;
    readonly error?: string;
    readonly recentEvents?: Event[];
    readonly upcomingEvents?: Event[];
    readonly attendEvent: (event: Event) => void;
    readonly unattendEvent: (event: Event) => void;
    readonly addToCalendarEvent: (event: Event) => void;
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
            {this.renderEventsTable(this.props.upcomingEvents)}
            <h1>Recent Events</h1>
            {this.renderEventsTable(this.props.recentEvents)}
            <span>{this.props.error}</span>
        </>;
    }

    private renderEventsTable(events?: Event[]) {
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

    private renderEventsRows(events: Event[]) {
        // events.sort((e1, e2) => e2.timestamp.toMillis() - e1.timestamp.toMillis());
        return events.map((e, index) => {
            const keys = Object.keys(e.attendees);
            const attendees = keys.map(k => e.attendees[k]).sort((a1, a2) => {
                if (a1.score !== undefined && a2.score !== undefined) {
                    return a2.score - a1.score;
                } else {
                    return a1.name.localeCompare(a2.name);
                }
            });
            const openSeats = e.game.maxPlayers - keys.length;
            const timestamp = e.timestamp.toDate();
            const timestampMidnight = timestamp;
            timestampMidnight.setHours(0, 0, 0, 0);
            const now = new Date();
            return <tr key={index}>
                <td>{timestamp.toDateString()}</td>
                <td><a href={e.game.bggLink} target="_blank">{e.game.name}</a></td>
                <td>{attendees.map((a, i) => (<span key={i}>{a.name}{a.score ? `: ${a.score}` : ''}<br /></span>))}</td>
                <td>{openSeats}</td>
                <td>{timestampMidnight > now && (!e.attendees[this.props.currentUserId] && openSeats > 0
                    ? <button type="button" onClick={this.attendEvent(e)}>Attend</button>
                    : <div><button type="button" onClick={this.unattendEvent(e)}>Unattend</button><button type="button" onClick={this.addToCalendarEvent(e)}>Add to Calendar</button></div>)}
                </td>
            </tr>;
        });
    }

    private attendEvent(event: Event) {
        return () => this.props.attendEvent(event);
    }

    private unattendEvent(event: Event) {
        return () => this.props.unattendEvent(event);
    }

    private addToCalendarEvent(event: Event) {
        return () => {
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
}