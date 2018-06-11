import * as React from 'react';
import { IEvent } from 'src/models';

export interface IEventsComponentProperties {
    readonly currentUserId: string;
    readonly error?: string;
    readonly events?: IEvent[];
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
                        <th>Attendees</th>
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
                <td>{e.attendees.map(a => a.displayName).join(', ')}</td>
                <td>{e.attendees.some(a => a.userId === this.props.currentUserId)
                    ? <button type="button">Unattend</button>
                    : <button type="button">Attend</button>}
                </td>
            </tr >
        ));
    }
}