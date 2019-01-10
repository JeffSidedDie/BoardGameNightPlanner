import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { Field } from 'src/common/field';
import { GameData, GameDocument } from 'src/common/models';

export interface GamesFormComponentProperties {
    readonly error?: string;
    readonly game?: GameDocument;
    readonly saveGame: (game: GameData, id?: string) => void;
}

export class GamesForm extends React.Component<GamesFormComponentProperties> {

    private formRef: React.RefObject<Formik<GameData>>;

    constructor(props: GamesFormComponentProperties) {
        super(props);
        this.formRef = React.createRef<Formik<GameData>>();
    }

    public componentWillUpdate() {
        if (!this.props.game && this.formRef.current) {
            this.formRef.current.resetForm();
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
            <div className="row">
                <Field<GameData> name="name" label="Name" type="text" />
                <Field<GameData> name="bggLink" label="BGG Link" type="text" />
                <Field<GameData> name="maxPlayers" label="Max Players" type="number" />
            </div>
            <button className="button-primary" type="submit">Save</button>
        </Form>;
    }

    private handleSubmit = (values: GameData) => {
        this.props.saveGame(values, this.props.game ? this.props.game.id : '');
    }
}