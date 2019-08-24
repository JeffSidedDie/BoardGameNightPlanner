import { Form, Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';
import { TimestampField } from 'common/components/timestamp-field';
import { Field } from 'common/components/field';
import { GamesSelect } from 'games';
import { Event } from 'models';
import { RouteComponentProps } from 'react-router';
import { useEvent, saveEvent } from 'firebase-hooks/events';
import * as firebase from 'firebase/app';

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

export const EventForm: React.FC<RouteComponentProps<{ id?: string }>> = (props) => {
    const event = useEvent(props.match.params.id);

    return <Formik<Event>
        enableReinitialize={true}
        initialValues={event ? event.data : defaultEvent}
        onSubmit={handleSubmit}
        render={renderForm}
    />;

    function renderForm(props: FormikProps<Event>) {
        return <Form>
            <h2 className="title">Edit Event</h2>
            <Field<Event> name="timestamp" label="Timestamp" component={TimestampField} />
            <Field<Event> name="game" label="Game" type="file" component={GamesSelect} />
            <button className="button is-primary" type="submit" disabled={props.isSubmitting}>Save</button>
        </Form>;
    }

    async function handleSubmit(values: Event, formikActions: FormikActions<Event>) {
        await saveEvent(props.match.params.id, values);
        formikActions.resetForm(defaultEvent);
    }
}