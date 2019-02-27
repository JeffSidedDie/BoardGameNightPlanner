import * as firebase from 'firebase';
import { Form, Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';
import { DateTimeField } from 'src/common/components/datetime-field';
import { Field } from 'src/common/components/field';
import { GamesSelect } from 'src/common/components/games-select.container';
import { EventData, EventDocument, GameDocument } from 'src/common/models';

export interface EventFormComponentProperties {
    readonly event?: EventDocument;
    readonly games: GameDocument[];
    readonly subscribeGames: () => void;
    readonly unsubscribeGames: () => void;
    readonly saveEvent: (event: EventData, id?: string) => Promise<void>;
}

const defaultEventData: EventData = {
    timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
    attendees: {},
    game: {
        id: '',
        data: {
            name: '',
            bggLink: '',
            maxPlayers: 4
        },
    },
};

export class EventFormComponent extends React.Component<EventFormComponentProperties> {

    public componentDidMount() {
        this.props.subscribeGames();
    }

    public componentWillUnmount() {
        this.props.unsubscribeGames();
    }

    public render() {
        return <Formik<EventData>
            enableReinitialize={true}
            initialValues={this.props.event ? this.props.event.data : defaultEventData}
            onSubmit={this.handleSubmit}
            render={this.renderForm}
        />;
    }

    private renderForm = (props: FormikProps<EventData>) => {
        return <Form>
            <h2 className="title">Edit Event</h2>
            <Field<EventData> name="timestamp" label="Timestamp" component={DateTimeField} />
            <Field<EventData> name="game" label="Game" type="file" component={GamesSelect} />
            <button className="button is-primary" type="submit">Save</button>
        </Form>;
    }

    private handleSubmit = async (values: EventData, formikActions: FormikActions<EventData>) => {
        await this.props.saveEvent(values, this.props.event ? this.props.event.id : '');
        formikActions.resetForm();
    }
}