import * as firebase from 'firebase';
import { FieldProps, Form, Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';
import { Field } from 'src/common/components/field';
import { ObjectSelectField } from 'src/common/components/object-select-field';
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
            <Field<EventData> name="timestamp" label="Timestamp" type="date" />
            <Field<EventData> name="game" label="Game" render={this.renderGamesSelect} />
            <button className="button is-primary" type="submit">Save</button>
        </Form>;
    }

    private renderGamesSelect = (props: FieldProps<EventData>) => {
        return <ObjectSelectField<EventData, GameDocument>
            values={this.props.games}
            keySelector={this.gameKeySelector}
            labelSelector={this.gameLabelSelector}
            {...props} />;
    }

    private gameKeySelector = (game: GameDocument) => game.id;
    private gameLabelSelector = (game: GameDocument) => game.data.name;

    private handleSubmit = async (values: EventData, formikActions: FormikActions<EventData>) => {
        await this.props.saveEvent(values, this.props.event ? this.props.event.id : '');
        formikActions.resetForm();
    }
}