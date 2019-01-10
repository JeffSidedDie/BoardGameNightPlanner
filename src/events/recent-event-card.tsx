import * as React from 'react';
import { Attendee, EventDocument } from 'src/common/models';

export interface RecentEventCardProperties {
    readonly event: EventDocument;
    readonly currentUserId: string;
}

export class RecentEventCard extends React.Component<RecentEventCardProperties> {

    public render() {
        const keys = Object.keys(this.props.event.data.attendees);
        let self: Attendee | null = null;
        const attendees = keys.map(k => {
            if (k === this.props.currentUserId) {
                self = this.props.event.data.attendees[k];
            }
            return this.props.event.data.attendees[k];
        }).sort((a1, a2) => {
            if (a1.score !== undefined && a2.score !== undefined) {
                return a2.score - a1.score;
            } else {
                return a1.name.localeCompare(a2.name);
            }
        });
        const firstPlace = attendees.slice(0, 1)[0];
        const otherPlaces = firstPlace.score ? attendees.slice(1, attendees.length) : attendees;
        const timestamp = this.props.event.data.timestamp.toDate();

        return <div className="four columns card">
            <h3>
                <a href={this.props.event.data.game.data.bggLink} target="_blank">{this.props.event.data.game.data.name}</a>
            </h3>
            <p>{timestamp.toDateString()}</p>
            {firstPlace.score &&
                <h5 className={firstPlace === self ? 'italics' : ''}>
                    <i className="fas fa-star" /> {firstPlace.name}: {firstPlace.score} <i className="fas fa-star" />
                </h5>
            }
            <p>
                {otherPlaces.map((a, i) => (
                    <span key={i} className={a === self ? 'italics' : ''}>
                        {a.name}{a.score !== undefined ? `: ${a.score}` : ''}
                        <br />
                    </span>
                ))}
            </p>
        </div>;
    }
}