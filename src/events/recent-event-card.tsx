import * as React from 'react';
import { Document, Event, User } from 'models';
import { EventScoreForm } from './event-score-form';
import { useState } from 'react';
import { AttendeeWithScore } from './attendee-with-score';

export interface RecentEventCardProperties {
    readonly event: Document<Event>;
    readonly user: Document<User>;
}

export const RecentEventCard: React.FC<RecentEventCardProperties> = (props) => {
    const [scoresMode, setScoresMode] = useState<boolean>(false);

    const keys = Object.keys(props.event.data.attendees);
    const attendees: AttendeeWithScore[] = keys.map(k => {
        return {
            id: k,
            name: props.event.data.attendees[k],
            score: props.event.data.scores && props.event.data.scores[k],
            isSelf: k === props.user.id
        };
    }).sort((a1, a2) => {
        if (a1.score !== undefined && a2.score !== undefined) {
            return a2.score - a1.score;
        } else {
            return a1.name.localeCompare(a2.name);
        }
    });
    const timestamp = props.event.data.timestamp.toDate();

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
                <p>{timestamp.toDateString()}</p>
                {scoresMode ?
                    <EventScoreForm eventId={props.event.id}
                        attendees={attendees}
                        onCancel={setScoresModeInactive} />
                    : renderAttendees(attendees)
                }
            </div>
        </div>
    </div>;

    function renderAttendees(attendees: AttendeeWithScore[]) {
        const firstPlace = attendees.slice(0, 1)[0];
        const otherPlaces = firstPlace.score !== undefined ? attendees.slice(1, attendees.length) : attendees;
        return <>
            {firstPlace.score !== undefined &&
                <h5 className={firstPlace.isSelf ? 'is-italic' : ''}>
                    <i className="fas fa-star" /> {firstPlace.name}: {firstPlace.score} <i className="fas fa-star" />
                </h5>
            }
            <p>
                {otherPlaces.map((a, i) => (
                    <span key={i} className={a.isSelf ? 'is-italic' : ''}>
                        {a.name}{a.score !== undefined ? `: ${a.score}` : ''}
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