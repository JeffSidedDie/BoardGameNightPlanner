import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import * as React from 'react';
import { Field } from 'common/components/field';
import { FieldWrapper } from 'common/components/field-wrapper';
import { Scores } from 'models';
import { updateScores } from 'firebase-hooks/events';
import { AttendeeWithScore } from './attendee-with-score';

export interface EventScoreFormProperties {
    readonly eventId: string;
    readonly attendees: AttendeeWithScore[];
    readonly onCancel: () => void;
}

// Defining this because Formik doesn't like Arrays being root object
interface AttendeesList {
    readonly attendees: AttendeeWithScore[];
}

export const EventScoreForm: React.FC<EventScoreFormProperties> = (props) => {
    // Do this to deep clone the array and initialize any undefined scores to 0
    // Otherwise, React complains about uncontrolled inputs
    const list = JSON.parse(JSON.stringify(props.attendees)) as AttendeeWithScore[];
    list.forEach((a) => a.score = a.score || 0);

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
                            <Field<AttendeeWithScore> name="score" label={a.name} type="number" className="input" index={i} />
                        </FieldWrapper>
                    </div>
                </div>
            ))}
            <div className="field is-grouped">
                <div className="control">
                    <button type="submit" className="button is-primary" disabled={props.isSubmitting}>Save</button>
                </div>
                <div className="control">
                    <button type="button" className="button" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </Form >;
    }

    async function handleSubmit(values: AttendeesList, formikHelpers: FormikHelpers<AttendeesList>) {
        const scores: Scores = {};
        values.attendees.forEach((a, i) => scores[a.id] = a.score!);
        await updateScores(props.eventId, scores);
        formikHelpers.resetForm();
        props.onCancel();
    }

    function handleCancel(e: React.MouseEvent) {
        props.onCancel();
    }
}