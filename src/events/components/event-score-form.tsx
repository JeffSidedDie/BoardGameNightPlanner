import { Form, Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';
import { Field } from 'src/common/components/field';
import { FieldWrapper } from 'src/common/components/field-wrapper';
import { AttendeeData, AttendeeDocument } from 'src/common/models';

export interface EventScoreFormProperties {
    readonly eventId: string;
    readonly attendees: AttendeeDocument[];
    readonly onCancel: () => void;
    readonly updateScores: (eventId: string, attendees: AttendeeDocument[]) => Promise<void>;
}

// Defining this because Formik doesn't like Arrays being root object
interface AttendeesList {
    readonly attendees: AttendeeDocument[];
}

export class EventScoreForm extends React.Component<EventScoreFormProperties> {
    public render() {
        // Do this to deep clone the array and initialize any undefined scores to 0
        // Otherwise, React complains about uncontrolled inputs
        const list = JSON.parse(JSON.stringify(this.props.attendees)) as AttendeeDocument[];
        list.forEach((a) => a.data.score = a.data.score || 0);

        return <Formik<AttendeesList>
            enableReinitialize={true}
            initialValues={{ attendees: list }}
            onSubmit={this.handleSubmit}
            render={this.renderForm}
        />;
    }

    private renderForm = (props: FormikProps<AttendeesList>) => {
        return <Form>
            {this.props.attendees.map((a, i) => (
                <div className="field" key={i}>
                    <div className="control">
                        <FieldWrapper<AttendeesList, 'attendees'> name="attendees">
                            <FieldWrapper<AttendeeDocument, 'data'> name="data" index={i}>
                                <Field<AttendeeData> name="score" label={a.data.name} type="number" className="input" />
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
                    <button type="button" className="button" onClick={this.handleCancel}>Cancel</button>
                </div>
            </div>
        </Form >;
    }

    private handleSubmit = async (values: AttendeesList, formikActions: FormikActions<AttendeesList>) => {
        await this.props.updateScores(this.props.eventId, values.attendees);
        formikActions.resetForm();
        this.props.onCancel();
    }

    private handleCancel = (e: React.MouseEvent) => {
        this.props.onCancel();
    }
}