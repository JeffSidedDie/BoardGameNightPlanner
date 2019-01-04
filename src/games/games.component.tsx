import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Field } from 'src/_forms/field';
import { Game } from 'src/common/models';

export interface GamesComponentProperties extends RouteComponentProps<{ id?: string }> {
    readonly currentGame?: Game;
    readonly loadGame: (id: string) => void;
    readonly saveGame: (game: Partial<Game>, id?: string) => void;
}

export class GamesComponent extends React.Component<GamesComponentProperties> {

    constructor(props: GamesComponentProperties) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public componentDidMount() {
        if (this.props.match.params.id) {
            this.props.loadGame(this.props.match.params.id);
        }
    }

    public render() {
        return <Formik
            enableReinitialize={true}
            initialValues={this.props.currentGame || { name: '', bggLink: '', maxPlayers: 4 }}
            onSubmit={this.handleSubmit}
            render={this.renderForm}
        />;
    }

    private renderForm(formikBag: FormikProps<Game>) {
        return <Form>
            <Field<Game> name="name" label="Name" type="text" />
            <Field<Game> name="bggLink" label="BGG Link" type="text" />
            <Field<Game> name="maxPlayers" label="Max Players" type="number" />
            <br />
            <button type="submit">Save</button>
        </Form>;
    }

    private handleSubmit(values: Game) {
        const game = this.props.currentGame ? { ...this.props.currentGame, ...values } : values;
        this.props.saveGame(game, this.props.match.params.id);
    }
}