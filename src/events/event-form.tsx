import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import * as React from 'react';
import { TimestampField } from 'common/components/timestamp-field';
import { Field } from 'common/components/field';
import { GamesSelect } from 'games';
import { Event2, User, Document } from 'models';
import { RouteComponentProps } from 'react-router';
import { useEvent, saveEvent } from 'firebase-hooks/events';
import * as firebase from 'firebase/app';
import { TypedField } from 'common/components/typed-field';

const defaultEvent: Event2 = {
    ownerUserId: '',
    location: '',
    description: '',
    timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
    attendeeIds: [],
    game: {
        id: '',
        data: {
            name: '',
            bggLink: '',
            maxPlayers: 4
        },
    },
};

interface EventFormProperties extends RouteComponentProps<{ id?: string }> {
    readonly user: Document<User>;
}

export const EventForm: React.FC<EventFormProperties> = (props) => {
    let event: Event2 = defaultEvent;
    event.ownerUserId = props.user.id;
    event.location = '3464 Roxboro Rd NE, Apt 409, Atlanta, GA 30326';

    const eventDoc = useEvent(props.match.params.id);
    if (props.match.params.id !== undefined) {
        if (eventDoc === null) {
            return <></>;
        } else {
            event = eventDoc.data;
        }
    }

    return <Formik<Event2>
        enableReinitialize={true}
        initialValues={event}
        onSubmit={handleSubmit}
    >
        <Form>
            <h2 className="title">Edit Event</h2>
            <TimestampField<Event2> name="timestamp" label="Timestamp" />
            {/* <Field<Event> name="timestamp" label="Timestamp" component={TimestampField} /> */}
            <Field<Event2> name="game" label="Game" type="file" component={GamesSelect} />
            <button className="button is-primary" type="submit">Save</button>
        </Form>
    </Formik>;

    async function handleSubmit(values: Event2, formikHelpers: FormikHelpers<Event2>) {
        await saveEvent(props.match.params.id, values);
        formikHelpers.resetForm({ values: defaultEvent });
    }
}
EventForm.whyDidYouRender = true;