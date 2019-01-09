import * as React from 'react';
import { Field, Form } from 'src/common/forms';
import { GameData, GameDocument } from 'src/common/models';

export interface GamesFormComponentProperties {
    readonly error?: string;
    readonly game?: GameDocument;
    readonly saveGame: (game: GameData, id?: string) => void;
}

export class GamesForm extends React.Component<GamesFormComponentProperties> {

    private formRef: React.RefObject<Form<GameData>>;

    constructor(props: GamesFormComponentProperties) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formRef = React.createRef<Form<GameData>>();
    }

    public componentWillUpdate() {
        if (!this.props.game && this.formRef.current) {
            this.formRef.current.resetForm();
        }
    }

    public render() {
        return <>
            <Form<GameData>
                ref={this.formRef}
                enableReinitialize={true}
                initialValues={this.props.game ? this.props.game.data : { name: '', bggLink: '', maxPlayers: 4 }}
                onSubmit={this.handleSubmit}
            >
                <div className="row">
                    <Field<GameData> name="name" label="Name" type="text" />
                    <Field<GameData> name="bggLink" label="BGG Link" type="text" />
                    <Field<GameData> name="maxPlayers" label="Max Players" type="number" />
                </div>
                <button className="button-primary" type="submit">Save</button>
            </Form>
            <span>{this.props.error}</span>
        </>;
    }

    private handleSubmit(values: GameData) {
        this.props.saveGame(values, this.props.game ? this.props.game.id : '');
    }
}