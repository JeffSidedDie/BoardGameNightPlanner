import * as React from 'react';
import { Field, Form } from 'src/common/forms';
import { Game, GameDocument } from 'src/common/models';

export interface GamesFormComponentProperties {
    readonly error?: string;
    readonly game?: GameDocument;
    readonly saveGame: (game: Game, id?: string) => void;
}

export class GamesForm extends React.Component<GamesFormComponentProperties> {

    constructor(props: GamesFormComponentProperties) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public render() {
        return <>
            <Form<Game>
                enableReinitialize={true}
                initialValues={this.props.game ? this.props.game.data : { name: '', bggLink: '', maxPlayers: 4 }}
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
        this.props.saveGame(values, this.props.game ? this.props.game.id : '');
    }
}