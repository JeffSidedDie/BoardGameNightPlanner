import * as FileSaver from 'file-saver';
import * as ics from 'ics-browser';
import * as React from 'react';
import { IEvent } from 'src/common/models';

export interface IEventsComponentProperties {
  readonly currentUserId: string;
  readonly error?: string;
  readonly events?: IEvent[];
  readonly attendEvent: (event: IEvent) => void;
  readonly unattendEvent: (event: IEvent) => void;
  readonly addToCalendarEvent: (event: IEvent) => void;
  readonly subscribeEvents: () => void;
  readonly unsubscribeEvents: () => void;
}

// TODO: delete this sample content
const sampleDopples = [
  {
    id: 1,
    name: 'Doppledore',
  },
  {
    id: 2,
    name: 'El Jeffe',
  },
  {
    id: 3,
    name: 'heyimsantiago',
  },
  {
    id: 4,
    name: 'Joxy',
  },
  {
    id: 5,
    name: 'kido',
  },
];

const sampleNavItems = [
  {
    displayText: 'Board Games',
    to: 'board-games',
  },
  {
    displayText: 'Happy Hours',
    to: 'happy-hours',
  },
  {
    displayText: 'Pool Parties',
    to: 'pool-parties',
  },
];

export class EventsComponent extends React.Component<
  IEventsComponentProperties
> {
  public componentDidMount() {
    this.props.subscribeEvents();
  }

  public componentWillUnmount() {
    this.props.unsubscribeEvents();
  }

  public render() {
    return (
      <>
        <div className="row">
          {/* This is just an example left nav for El Jeffe */}
          <div className="three columns nav">
            <div className="nav_title">Navigation</div>
            <ul className="nav_list">
              {sampleNavItems.map(navItem => (
                <li key={navItem.to} className="nav_item">
                  <a className="nav_link" href="">
                    {navItem.displayText}
                  </a>
                </li>
              ))}
            </ul>
            {/* This is just an example dropdown for El Jeffe to use elsewhere */}
            <div className="my-3">
              <label htmlFor="selectADopple">Select A Dopple</label>
              <select id="selectADopple">
                {sampleDopples.map(dopple => (
                  <option key={dopple.id} value={dopple.id}>
                    {dopple.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="nine columns">
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
              <tbody>{this.renderEvents()}</tbody>
            </table>
          </div>
        </div>
        <span>{this.props.error}</span>
      </>
    );
  }

  private renderEvents() {
    if (!this.props.events) {
      return;
    }
    this.props.events.sort(
      (e1, e2) => e2.timestamp.toMillis() - e1.timestamp.toMillis()
    );

    return this.props.events.map((e, index) => {
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
      return (
        <tr key={index}>
          <td>{timestamp.toDateString()}</td>
          <td>
            <a href={e.game.bggLink} target="_blank">
              {e.game.name}
            </a>
          </td>
          <td>
            {attendees.map((a, i) => (
              <span key={i}>
                {a.name}
                {a.score ? `: ${a.score}` : ''}
                <br />
              </span>
            ))}
          </td>
          <td>{openSeats}</td>
          <td>
            {timestampMidnight > now &&
              (!e.attendees[this.props.currentUserId] && openSeats > 0 ? (
                <button type="button" onClick={this.attendEvent(e)}>
                  Attend
                </button>
              ) : (
                <div>
                  <button type="button" onClick={this.unattendEvent(e)}>
                    Unattend
                  </button>
                  <button type="button" onClick={this.addToCalendarEvent(e)}>
                    Add to Calendar
                  </button>
                </div>
              ))}
          </td>
        </tr>
      );
    });
  }

  private attendEvent(event: IEvent) {
    return () => this.props.attendEvent(event);
  }

  private unattendEvent(event: IEvent) {
    return () => this.props.unattendEvent(event);
  }

  private addToCalendarEvent(event: IEvent) {
    return () => {
      // create calendar event
      const eventDate = event.timestamp.toDate();
      const icsResult = ics.createEvent({
        description: `Jeff's Weekly Board Game Night!\nFeatured Game: ${
          event.game.name
        }\nBGG Link: ${event.game.bggLink}`,
        duration: { hours: 3 },
        location: '3464 Roxboro Rd NE, Apt 409, Atlanta, GA 30326, USA',
        start: [
          eventDate.getFullYear(),
          eventDate.getMonth() + 1,
          eventDate.getDate(),
          19,
          0,
        ],
        title: 'Board Game Night',
      });
      if (icsResult.value) {
        const blob = new Blob([icsResult.value], {
          type: 'text/calendar;charset=utf8',
        });
        FileSaver.saveAs(
          blob,
          `Board Game Night ${eventDate.toDateString()}.ics`
        );
      }
    };
  }
}
