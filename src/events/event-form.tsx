import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import * as React from 'react';
import { TimestampField } from 'common/components/timestamp-field';
import { Field } from 'common/components/field';
import { GamesSelect } from 'games';
import { Event } from 'models';
import { RouteComponentProps } from 'react-router';
import { useEvent, saveEvent } from 'firebase-hooks/events';
import * as firebase from 'firebase/app';
import { TypedField } from 'common/components/typed-field';

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
    let event: Event = defaultEvent;

    const eventDoc = useEvent(props.match.params.id);
    if (props.match.params.id !== undefined) {
        if (eventDoc === null) {
            return <></>;
        } else {
            event = eventDoc.data;
        }
    }

    return <Formik<Event>
        enableReinitialize={true}
        initialValues={event}
        onSubmit={handleSubmit}
    >
        <Form>
            <h2 className="title">Edit Event</h2>
            <TimestampField<Event> name="timestamp" label="Timestamp" />
            {/* <Field<Event> name="timestamp" label="Timestamp" component={TimestampField} /> */}
            <Field<Event> name="game" label="Game" type="file" component={GamesSelect} />
            <button className="button is-primary" type="submit">Save</button>
        </Form>
    </Formik>;

    async function handleSubmit(values: Event, formikHelpers: FormikHelpers<Event>) {
        await saveEvent(props.match.params.id, values);
        formikHelpers.resetForm({ values: defaultEvent });
    }
}
EventForm.whyDidYouRender = true;