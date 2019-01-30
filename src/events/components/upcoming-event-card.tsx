import * as FileSaver from 'file-saver';
import * as ics from 'ics-browser';
import * as React from 'react';
import { EventDocument } from 'src/common/models';

export interface UpcomingEventCardProperties {
    readonly event: EventDocument;
    readonly currentUserId: string;
    readonly attendEvent: (event: EventDocument) => void;
    readonly unattendEvent: (event: EventDocument) => void;
}

interface UpcomingEventCardState {
    readonly showAttendees: boolean;
}

export class UpcomingEventCard extends React.Component<UpcomingEventCardProperties, UpcomingEventCardState> {

    public render() {
        const keys = Object.keys(this.props.event.data.attendees);
        const openSeats = this.props.event.data.game.data.maxPlayers - keys.length;
        const timestamp = this.props.event.data.timestamp.toDate();
        const timestampMidnight = new Date(timestamp);
        timestampMidnight.setHours(0, 0, 0, 0);
        const now = new Date();
        const attending = this.props.event.data.attendees[this.props.currentUserId];
        const otherAttendees = keys.filter(k => k !== this.props.currentUserId).map(k => this.props.event.data.attendees[k]).sort((a1, a2) => {
            return a1.name.localeCompare(a2.name);
        });

        let status = <></>;
        if (attending) {
            status = <em><i className="fas fa-check" /> You're Attending!</em>;
        } else if (timestampMidnight <= now) {
            status = <em><i className="fas fa-times" /> Closed</em>;
        } else if (openSeats > 0) {
            status = <em>{openSeats + ' Seats Available'}</em>;
        } else {
            status = <em><i className="fas fa-times" /> Full</em>;
        }

        let actions = <></>;
        if (timestampMidnight > now) {
            if (!attending && openSeats > 0) {
                actions = <div className="card-footer">
                    <button type="button" className="card-footer-item" onClick={this.handleAttendEvent}>Attend</button>
                </div>;
            } else if (attending) {
                actions = <div className="card-footer">
                    <button type="button" className="card-footer-item" onClick={this.handleUnattendEvent}>Unattend</button>
                    &nbsp;
                    <button type="button" className="card-footer-item" onClick={this.addToCalendarEvent}>
                        <i className="fas fa-calendar-plus fa-2x" />
                    </button>
                </div>;
            }
        }

        return <div className="column is-one-third">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-header-title is-size-3">
                        <a href={this.props.event.data.game.data.bggLink} target="_blank">{this.props.event.data.game.data.name}</a>
                    </h3>
                </div>
                <div className="card-content">
                    <div className="content">
                        <p>{timestamp.toDateString()}<br />{timestamp.toLocaleTimeString()}</p>
                        <h5>
                            {status}
                            {openSeats < this.props.event.data.game.data.maxPlayers && <>
                                &nbsp;
                                    <a onClick={this.handleShowAttendees}>
                                    <i className="fas fa-question-circle" />
                                </a>
                            </>}
                        </h5>
                        {this.state && this.state.showAttendees && <p>
                            <strong>Other Attendees:</strong>
                            <br />
                            {otherAttendees.map((a, i) => <span key={i}>{a.name}<br /></span>)}
                        </p>}
                    </div>
                    {actions}
                </div>
            </div>
        </div>;
    }

    private handleShowAttendees = (e: React.MouseEvent) => {
        this.setState((state, props) => {
            return {
                ...state,
                showAttendees: state ? !state.showAttendees : true,
            };
        });
    }

    private handleAttendEvent = (e: React.MouseEvent) => {
        this.props.attendEvent(this.props.event);
    }

    private handleUnattendEvent = (e: React.MouseEvent) => {
        this.props.unattendEvent(this.props.event);
    }

    private addToCalendarEvent = (e: React.MouseEvent) => {
        // create calendar event
        const eventDate = this.props.event.data.timestamp.toDate();
        const icsResult = ics.createEvent({
            description: `Jeff's Weekly Board Game Night!\nFeatured Game: ${this.props.event.data.game.data.name}\nBGG Link: ${this.props.event.data.game.data.bggLink}`,
            duration: { hours: 3 },
            location: '3464 Roxboro Rd NE\, Apt 409\, Atlanta\, GA 30326\, USA',
            start: [eventDate.getFullYear(), eventDate.getMonth() + 1, eventDate.getDate(), 19, 0],
            title: 'Board Game Night',
        });
        if (icsResult.value) {
            const blob = new Blob([icsResult.value], { type: 'text/calendar;charset=utf8' });
            FileSaver.saveAs(blob, `Board Game Night ${eventDate.toDateString()}.ics`);
        }
    }
}