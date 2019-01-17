import { Form, Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';
import { Field } from 'src/common/components/field';
import { FileField } from 'src/common/components/file-field';
import { GameDocument } from 'src/common/models';
import { GameDataWithImage } from '../games.actions';

export interface GameFormComponentProperties {
    readonly error?: string;
    readonly game?: GameDocument;
    readonly saveGame: (game: GameDataWithImage, id?: string) => Promise<void>;
}

export class GameForm extends React.Component<GameFormComponentProperties> {

    public render() {
        return <>
            <Formik
                enableReinitialize={true}
                initialValues={this.props.game ? this.props.game.data : { name: '', bggLink: '', maxPlayers: 4 }}
                onSubmit={this.handleSubmit}
                render={this.renderForm}
            />
            <span>{this.props.error}</span>
        </>;
    }

    private renderForm = (props: FormikProps<GameDataWithImage>) => {
        return <Form>
            <h2 className="title">Edit Game</h2>
            <div className="columns">
                <div className="column is-one-third">
                    <Field<GameDataWithImage> name="name" label="Name" type="text" />
                </div>
                <div className="column is-one-third">
                    <Field<GameDataWithImage> name="bggLink" label="BGG Link" type="text" />
                </div>
                <div className="column is-one-third">
                    <Field<GameDataWithImage> name="maxPlayers" label="Max Players" type="number" />
                </div>
                <div className="column is-one-third">
                    <Field<GameDataWithImage> name="image" label="Image" type="file" component={FileField} />
                </div>
            </div>
            <button className="button is-primary" type="submit">Save</button>
        </Form>;
    }

    private handleSubmit = async (values: GameDataWithImage, formikActions: FormikActions<GameDataWithImage>) => {
        await this.props.saveGame(values, this.props.game ? this.props.game.id : '');
        formikActions.resetForm();
    }
}