import * as React from 'react';
import { AttendeeData, AttendeeDocument, EventDocument } from 'src/common/models';
import { EventScoreForm } from './event-score-form';

export interface RecentEventCardProperties {
    readonly event: EventDocument;
    readonly currentUserId: string;
}

interface RecentEventCardState {
    readonly scoresModeActive: boolean;
}

export class RecentEventCard extends React.Component<RecentEventCardProperties, RecentEventCardState> {

    public render() {
        const keys = Object.keys(this.props.event.data.attendees);
        let self: AttendeeData | null = null;
        const attendees: AttendeeDocument[] = keys.map(k => {
            if (k === this.props.currentUserId) {
                self = this.props.event.data.attendees[k];
            }
            return {
                id: k,
                data: this.props.event.data.attendees[k],
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
        const timestamp = this.props.event.data.timestamp.toDate();

        return <div className="column is-one-third">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-header-title">
                        <a href={this.props.event.data.game.data.bggLink} target="_blank">{this.props.event.data.game.data.name}</a>
                    </h3>
                </div>
                <div className="card-content">
                    <div className="content">
                        <p>{timestamp.toDateString()}</p>
                        {this.state && this.state.scoresModeActive ?
                            <EventScoreForm attendees={attendees} self={self} onCancel={this.toggleScoresModeActive} />
                            : this.renderAttendees(firstPlace, otherPlaces, self)
                        }
                    </div>
                </div>
            </div>
        </div>;
    }

    private renderAttendees(firstPlace: AttendeeDocument, otherPlaces: AttendeeDocument[], self: AttendeeDocument | null) {
        return <>
            {firstPlace.data.score !== undefined &&
                <h5 className={firstPlace === self ? 'is-italic' : ''}>
                    <i className="fas fa-star" /> {firstPlace.data.name}: {firstPlace.data.score} <i className="fas fa-star" />
                </h5>
            }
            <p>
                {otherPlaces.map((a, i) => (
                    <span key={i} className={a === self ? 'is-italic' : ''}>
                        {a.data.name}{a.data.score !== undefined ? `: ${a.data.score}` : ''}
                        <br />
                    </span>
                ))}
            </p>
            <button type="button" className="button is-primary" onClick={this.handleEditScores}>Edit Scores</button>
        </>;
    }

    private handleEditScores = (e: React.MouseEvent) => {
        this.toggleScoresModeActive();
    }

    private toggleScoresModeActive = () => {
        this.setState((state, props) => {
            return {
                ...state,
                scoresModeActive: state ? !state.scoresModeActive : true,
            };
        });
    }
}