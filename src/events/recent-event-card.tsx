import * as React from 'react';
import { Document, Event, User, Attendee } from 'models';
import { EventScoreForm } from './event-score-form';
import { useState } from 'react';

export interface RecentEventCardProperties {
    readonly event: Document<Event>;
    readonly user: Document<User>;
}

export const RecentEventCard: React.FC<RecentEventCardProperties> = (props) => {
    const [scoresMode, setScoresMode] = useState<boolean>(false);

    const keys = Object.keys(props.event.data.attendees);
    let self: Attendee | undefined;
    const attendees: Document<Attendee>[] = keys.map(k => {
        if (k === props.user.id) {
            self = props.event.data.attendees[k];
        }
        return {
            id: k,
            data: props.event.data.attendees[k],
        };
    }).sort((a1, a2) => {
        if (a1.data.score !== undefined && a2.data.score !== undefined) {
            return a2.data.score - a1.data.score;
        } else {
            return a1.data.name.localeCompare(a2.data.name);
        }
    });
    const firstPlace = attendees.slice(0, 1)[0];
    const otherPlaces = firstPlace.data.score !== undefined ? attendees.slice(1, attendees.length) : attendees;
    const timestamp = props.event.data.timestamp.toDate();

    return <div className="card" data-key={props.event.id}>
        <div className="card-header">
            <h3 className="card-header-title is-size-3">
                <a href={props.event.data.game.data.bggLink} target="_blank" rel="noopener noreferrer">{props.event.data.game.data.name}</a>
            </h3>
        </div>
        <div className="card-content">
            <div className="content">
                <p>{timestamp.toDateString()}</p>
                {scoresMode ?
                    <EventScoreForm eventId={props.event.id}
                        attendees={attendees}
                        onCancel={setScoresModeInactive} />
                    : renderAttendees(firstPlace.data, otherPlaces, self)
                }
            </div>
        </div>
    </div>;

    function renderAttendees(firstPlace: Attendee, otherPlaces: Document<Attendee>[], self: Attendee | undefined) {
        return <>
            {firstPlace.score !== undefined &&
                <h5 className={firstPlace === self ? 'is-italic' : ''}>
                    <i className="fas fa-star" /> {firstPlace.name}: {firstPlace.score} <i className="fas fa-star" />
                </h5>
            }
            <p>
                {otherPlaces.map((a, i) => (
                    <span key={i} className={a.data === self ? 'is-italic' : ''}>
                        {a.data.name}{a.data.score !== undefined ? `: ${a.data.score}` : ''}
                        <br />
                    </span>
                ))}
            </p>
            {props.user.data.isAdmin &&
                <button type="button" className="button is-primary" onClick={setScoresModeActive}>Edit Scores</button>
            }
        </>;
    }

    function setScoresModeActive() {
        setScoresMode(true);
    }

    function setScoresModeInactive() {
        setScoresMode(false);
    }
}