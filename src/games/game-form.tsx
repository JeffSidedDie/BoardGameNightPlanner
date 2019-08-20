import { Form, Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';
import { Field } from 'common/components/field';
import { FileField } from 'common/components/file-field';
import { Game, Document } from 'models';
import { GameWithImage, saveGame } from 'firebase-hooks/games';

export interface GameFormProperties {
    readonly game: Document<Game> | null;
}

const defaultGame: GameWithImage = {
    name: '',
    bggLink: '',
    maxPlayers: 4
};

export const GameForm: React.FC<GameFormProperties> = (props) => {

    return <>
        <Formik
            enableReinitialize={true}
            initialValues={props.game ? props.game.data : defaultGame}
            onSubmit={handleSubmit}
            render={renderForm}
        />
    </>;

    function renderForm(props: FormikProps<GameWithImage>) {
        return <Form>
            <h2 className="title">Edit Game</h2>
            <div className="columns">
                <div className="column is-one-third">
                    <Field<GameWithImage> name="name" label="Name" type="text" />
                </div>
                <div className="column is-one-third">
                    <Field<GameWithImage> name="bggLink" label="BGG Link" type="text" />
                </div>
                <div className="column is-one-third">
                    <Field<GameWithImage> name="maxPlayers" label="Max Players" type="number" />
                </div>
                <div className="column is-one-third">
                    <Field<GameWithImage> name="image" label="Image" type="file" component={FileField} />
                </div>
            </div>
            <button className="button is-primary" type="submit">Save</button>
        </Form>;
    }

    async function handleSubmit(values: GameWithImage, formikActions: FormikActions<GameWithImage>) {
        await saveGame(values, props.game ? props.game.id : '');
        formikActions.resetForm(defaultGame);
    }
}