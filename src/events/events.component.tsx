import * as React from 'react';
import { IEvent } from 'src/common/models';

export interface IEventsComponentProperties {
    readonly currentUserId: string;
    readonly error?: string;
    readonly events?: IEvent[];
    readonly attendEvent: (event: IEvent) => void;
    readonly unattendEvent: (event: IEvent) => void;
    readonly subscribeEvents: () => void;
    readonly unsubscribeEvents: () => void;
}

export class EventsComponent extends React.Component<IEventsComponentProperties> {

    public componentDidMount() {
        this.props.subscribeEvents();
    }

    public componentWillUnmount() {
        this.props.unsubscribeEvents();
    }

    public render() {
        return <>
            <table>
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
                    {this.renderEvents()}
                </tbody>
            </table>
            <span>{this.props.error}</span>
        </>;
    }

    private renderEvents() {
        if (!this.props.events) { return; }

        return this.props.events.map((e, index) => (
            <tr key={index}>
                <td>{e.timestamp.toDate().toDateString()}</td>
                <td>{e.game}</td>
                <td>{Object.keys(e.attendees).map(key => e.attendees[key]).join(', ')}</td>
                <td>{e.maxAttendees - Object.keys(e.attendees).length}</td>
                <td>{e.attendees[this.props.currentUserId]
                    ? <button type="button" onClick={this.unattendEvent(e)}>Unattend</button>
                    : <button type="button" onClick={this.attendEvent(e)}>Attend</button>}
                </td>
            </tr >
        ));
    }

    private attendEvent(event: IEvent) {
        return () => this.props.attendEvent(event);
    }

    private unattendEvent(event: IEvent) {
        return () => this.props.unattendEvent(event);
    }
}