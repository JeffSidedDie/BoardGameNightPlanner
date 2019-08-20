import { Form, Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';
import { Field } from 'common/components/field';
import { FieldWrapper } from 'common/components/field-wrapper';
import { Attendee, Document } from 'models';
import { updateScores } from 'firebase-hooks/events';

export interface EventScoreFormProperties {
    readonly eventId: string;
    readonly attendees: Document<Attendee>[];
    readonly onCancel: () => void;
}

// Defining this because Formik doesn't like Arrays being root object
interface AttendeesList {
    readonly attendees: Document<Attendee>[];
}

export const EventScoreForm: React.FC<EventScoreFormProperties> = (props) => {
    // Do this to deep clone the array and initialize any undefined scores to 0
    // Otherwise, React complains about uncontrolled inputs
    const list = JSON.parse(JSON.stringify(props.attendees)) as Document<Attendee>[];
    list.forEach((a) => a.data.score = a.data.score || 0);

    return <Formik<AttendeesList>
        enableReinitialize={true}
        initialValues={{ attendees: list }}
        onSubmit={handleSubmit}
        render={renderForm}
    />;

    function renderForm(props: FormikProps<AttendeesList>) {
        return <Form>
            {props.values.attendees.map((a, i) => (
                <div className="field" key={i}>
                    <div className="control">
                        <FieldWrapper<AttendeesList, 'attendees'> name="attendees">
                            <FieldWrapper<Document<Attendee>, 'data'> name="data" index={i}>
                                <Field<Attendee> name="score" label={a.data.name} type="number" className="input" />
                            </FieldWrapper>
                        </FieldWrapper>
                    </div>
                </div>
            ))}
            <div className="field is-grouped">
                <div className="control">
                    <button type="submit" className="button is-primary">Save</button>
                </div>
                <div className="control">
                    <button type="button" className="button" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </Form >;
    }

    async function handleSubmit(values: AttendeesList, formikActions: FormikActions<AttendeesList>) {
        await updateScores(props.eventId, values.attendees);
        formikActions.resetForm();
        props.onCancel();
    }

    function handleCancel(e: React.MouseEvent) {
        props.onCancel();
    }
}