import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { Field } from 'src/_forms/field';
import { Game } from 'src/common/models';

export interface GamesComponentProperties {
    readonly userId: string;
}

export class GamesComponent extends React.Component<GamesComponentProperties> {

    public render() {
        return <Formik
            initialValues={{ name: '', bggLink: '', maxPlayers: 4 }}
            onSubmit={this.handleSubmit}
            render={this.renderForm}
        />;
    }

    private renderForm(formikBag: FormikProps<Game>) {
        return <Form>
            <Field<Game> name="name" label="Name" type="text" />
            <Field<Game> name="bggLink" label="BGG Link" type="text" />
            <Field<Game> name="maxPlayers" label="Max Players" type="number" />
            <button type="submit">Save</button>
        </Form>;
    }

    private handleSubmit(values: Game) {
        alert(JSON.stringify(values));
    }
}