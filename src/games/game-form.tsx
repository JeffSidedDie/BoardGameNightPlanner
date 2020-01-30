import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import * as React from 'react';
import { Field } from 'common/components/field';
import { FileField } from 'common/components/file-field';
import { GameWithMetadata, saveGame } from 'firebase-hooks/games';
import { useContext } from 'react';
import { SelectedGameContext } from './games-list';

const defaultGame: GameWithMetadata = {
    name: '',
    bggLink: '',
    maxPlayers: 4,
    updateExistingEvents: false,
};

export const GameForm: React.FC = () => {
    const selectedGameContext = useContext(SelectedGameContext);

    return <>
        <Formik
            enableReinitialize={true}
            initialValues={selectedGameContext.selectedGame ? selectedGameContext.selectedGame.data : defaultGame}
            onSubmit={handleSubmit}
        >
            {renderForm}
        </Formik>
    </>;

    function renderForm(props: FormikProps<GameWithMetadata>) {
        return <Form>
            {/* <h2 className="title">Edit Game</h2> */}
            <Field<GameWithMetadata> name="name" label="Name" type="text" />
            <Field<GameWithMetadata> name="bggLink" label="BGG Link" type="text" />
            <Field<GameWithMetadata> name="maxPlayers" label="Max Players" type="number" />
            {props.values.imageLink &&
                <figure className="image is-128x128">
                    <img alt="Game" src={props.values.imageLink} />
                </figure>
            }
            <Field<GameWithMetadata> name="image" label="Image" type="file" component={FileField} />
            <Field<GameWithMetadata> name="updateExistingEvents" label="Update Existing Events?" type="checkbox" checked={props.values.updateExistingEvents || false} />
            <button className="button is-primary" type="submit" disabled={props.isSubmitting}>Save</button>
        </Form>;
    }

    async function handleSubmit(values: GameWithMetadata, formikHelpers: FormikHelpers<GameWithMetadata>) {
        await saveGame(values, selectedGameContext.selectedGame ? selectedGameContext.selectedGame.id : '');
        formikHelpers.resetForm({ values: defaultGame });
        selectedGameContext.setSelectedGame(null);
    }
}
GameForm.whyDidYouRender = true;