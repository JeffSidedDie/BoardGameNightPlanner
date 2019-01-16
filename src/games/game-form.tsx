import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { Field } from 'src/common/field';
import { GameData, GameDocument } from 'src/common/models';

export interface GameFormComponentProperties {
    readonly error?: string;
    readonly game?: GameDocument;
    readonly saveGame: (game: GameData, id?: string) => void;
}

export class GameForm extends React.Component<GameFormComponentProperties> {

    private formRef: React.RefObject<Formik<GameData>>;

    constructor(props: GameFormComponentProperties) {
        super(props);
        this.formRef = React.createRef<Formik<GameData>>();
    }

    public componentWillUpdate() {
        if (!this.props.game && this.formRef.current) {
            this.formRef.current.resetForm(); // not sure of a better way to do this since submit is async
        }
    }

    public render() {
        return <>
            <Formik
                ref={this.formRef}
                enableReinitialize={true}
                initialValues={this.props.game ? this.props.game.data : { name: '', bggLink: '', maxPlayers: 4 }}
                onSubmit={this.handleSubmit}
                render={this.renderForm}
            />
            <span>{this.props.error}</span>
        </>;
    }

    private renderForm = (props: FormikProps<GameData>) => {
        return <Form>
            <h2 className="title">Edit Game</h2>
            <div className="columns">
                <div className="column is-one-third">
                    <Field<GameData> name="name" label="Name" type="text" />
                </div>
                <div className="column is-one-third">
                    <Field<GameData> name="bggLink" label="BGG Link" type="text" />
                </div>
                <div className="column is-one-third">
                    <Field<GameData> name="maxPlayers" label="Max Players" type="number" />
                </div>
            </div>
            <button className="button is-primary" type="submit">Save</button>
        </Form>;
    }

    private handleSubmit = (values: GameData) => {
        this.props.saveGame(values, this.props.game ? this.props.game.id : '');
    }
}