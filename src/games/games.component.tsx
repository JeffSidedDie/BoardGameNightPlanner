import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Field, Form } from 'src/common/forms';
import { Game } from 'src/common/models';

export interface GamesComponentProperties extends RouteComponentProps<{ id?: string }> {
    readonly error?: string;
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
        return <>
            <Form<Game>
                enableReinitialize={true}
                initialValues={this.props.currentGame || { name: '', bggLink: '', maxPlayers: 4 }}
                onSubmit={this.handleSubmit}
            >
                <div className="row">
                    <Field<Game> name="name" label="Name" type="text" />
                    <Field<Game> name="bggLink" label="BGG Link" type="text" />
                    <Field<Game> name="maxPlayers" label="Max Players" type="number" />
                </div>
                <button className="button-primary" type="submit">Save</button>
            </Form>
            <span>{this.props.error}</span>
        </>;
    }

    private handleSubmit(values: Game) {
        this.props.saveGame(values, this.props.match.params.id);
    }
}