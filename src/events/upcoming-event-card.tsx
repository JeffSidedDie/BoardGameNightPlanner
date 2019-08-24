import * as FileSaver from 'file-saver';
import * as ics from 'ics-browser';
import * as React from 'react';
import { Document, Event, User } from 'models';
import { useState } from 'react';
import { attendEvent, unattendEvent } from 'firebase-hooks/events';
import { GeneratedLink } from 'common/components/generatedLink';
import { Routes } from 'common/routes';

export interface UpcomingEventCardProperties {
    readonly event: Document<Event>;
    readonly user: Document<User>;
}

export const UpcomingEventCard: React.FC<UpcomingEventCardProperties> = (props) => {
    const [showAttendees, setshowAttendees] = useState<boolean>(false);

    const keys = Object.keys(props.event.data.attendees);
    const openSeats = props.event.data.game.data.maxPlayers - keys.length;
    const timestamp = props.event.data.timestamp.toDate();
    const timestampMidnight = new Date(timestamp);
    timestampMidnight.setHours(0, 0, 0, 0);
    const now = new Date();
    const attending = props.event.data.attendees[props.user.id];
    const otherAttendees = keys.filter(k => k !== props.user.id).map(k => props.event.data.attendees[k]).sort((a1, a2) => {
        return a1.localeCompare(a2);
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
                <button type="button" className="card-footer-item" onClick={async () => await attendEvent(props.event.id, props.user)}>Attend</button>
            </div>;
        } else if (attending) {
            actions = <div className="card-footer">
                <button type="button" className="card-footer-item" onClick={async () => await unattendEvent(props.event.id, props.user.id)}>Unattend</button>
                &nbsp;
                    <button type="button" className="card-footer-item" onClick={addToCalendarEvent}>
                    <i className="fas fa-calendar-plus fa-2x" />
                </button>
            </div>;
        }
    }

    return <div className="card" data-key={props.event.id}>
        <div className="card-image">
            <figure className="image is-square">
                <img alt={`${props.event.data.game.data.name} Box Art`} src={props.event.data.game.data.imageLink} />
            </figure>
        </div>
        <div className="card-header">
            <h3 className="card-header-title is-size-3">
                <a href={props.event.data.game.data.bggLink} target="_blank" rel="noopener noreferrer">{props.event.data.game.data.name}</a>
            </h3>
        </div>
        <div className="card-content">
            <div className="content">
                <p>{timestamp.toDateString()}<br />{timestamp.toLocaleTimeString()}</p>
                <h5>
                    {status}
                    {openSeats < props.event.data.game.data.maxPlayers && <>
                        &nbsp;
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a onClick={toggleShowAttendees}>
                            <i className="fas fa-question-circle" />
                        </a>
                    </>}
                </h5>
                {showAttendees && <p>
                    <strong>Other Attendees:</strong>
                    <br />
                    {otherAttendees.map((a, i) => <span key={i}>{a}<br /></span>)}
                </p>}

                {props.user.data.isAdmin &&
                    <GeneratedLink className="button is-primary" route={Routes.Events_Edit} parameters={{ id: props.event.id }}>Edit Event</GeneratedLink>
                }
            </div>
        </div>
        {actions}
    </div>;

    function toggleShowAttendees() {
        setshowAttendees(!showAttendees);
    }

    function addToCalendarEvent() {
        // create calendar event
        const eventDate = props.event.data.timestamp.toDate();
        const icsResult = ics.createEvent({
            description: `Jeff's Weekly Board Game Night!\nFeatured Game: ${props.event.data.game.data.name}\nBGG Link: ${props.event.data.game.data.bggLink}`,
            duration: { hours: 3 },
            location: '3464 Roxboro Rd NE, Apt 409, Atlanta, GA 30326, USA',
            start: [eventDate.getFullYear(), eventDate.getMonth() + 1, eventDate.getDate(), 19, 0],
            title: 'Board Game Night',
        });
        if (icsResult.value) {
            const blob = new Blob([icsResult.value], { type: 'text/calendar;charset=utf8' });
            FileSaver.saveAs(blob, `Board Game Night ${eventDate.toDateString()}.ics`);
        }
    }
}