import * as firebase from 'firebase';
import { Form, Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';
import { DateTimeField } from 'common/components/datetime-field';
import { Field } from 'common/components/field';
import { GamesSelect } from 'games/games-select';
import { Event, Document, Game } from 'models';

export interface EventFormProperties {
    readonly event?: Document<Event>;
    readonly games: Document<Game>[];
    readonly subscribeGames: () => void;
    readonly unsubscribeGames: () => void;
    readonly saveEvent: (event: Event, id?: string) => Promise<void>;
}

const defaultEvent: Event = {
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

export const EventForm: React.FC<EventFormProperties> = (props) => {
    return <Formik<Event>
        enableReinitialize={true}
        initialValues={props.event ? props.event.data : defaultEvent}
        onSubmit={handleSubmit}
        render={renderForm}
    />;

    function renderForm(props: FormikProps<Event>) {
        return <Form>
            <h2 className="title">Edit Event</h2>
            <Field<Event> name="timestamp" label="Timestamp" component={DateTimeField} />
            <Field<Event> name="game" label="Game" type="file" component={GamesSelect} />
            <button className="button is-primary" type="submit">Save</button>
        </Form>;
    }

    async function handleSubmit(values: Event, formikActions: FormikActions<Event>) {
        await props.saveEvent(values, props.event ? props.event.id : '');
        formikActions.resetForm();
    }
}