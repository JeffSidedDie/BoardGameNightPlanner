import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { Field } from 'src/_forms/field';
import { IGame } from 'src/common/models';

export interface IGamesComponentProperties {
    readonly userId: string;
}

export class GamesComponent extends React.Component<IGamesComponentProperties> {

    public render() {
        return <Formik
            initialValues={{ name: '', bggLink: '', maxPlayers: 4 }}
            onSubmit={this.handleSubmit}
            render={this.renderForm}
        />;
    }

    private renderForm(formikBag: FormikProps<IGame>) {
        return <Form>
            <Field<IGame> name="name" label="Name" type="text" />
            <Field<IGame> name="bggLink" label="BGG Link" type="text" />
            <Field<IGame> name="maxPlayers" label="Max Players" type="number" />
            <button type="submit">Save</button>
        </Form>;
    }

    private handleSubmit(values: IGame) {
        alert(JSON.stringify(values));
    }
}