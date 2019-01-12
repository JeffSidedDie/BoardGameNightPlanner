import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { Field } from 'src/common/components/field';
import { FileField } from 'src/common/components/file-field';
import { GameDocument } from 'src/common/models';
import { GameDataWithImage } from './games.actions';

export interface GameFormComponentProperties {
    readonly error?: string;
    readonly game?: GameDocument;
    readonly saveGame: (game: GameDataWithImage, id?: string) => void;
}

export class GameForm extends React.Component<GameFormComponentProperties> {

    private formRef: React.RefObject<Formik<GameDataWithImage>> = React.createRef<Formik<GameDataWithImage>>();

    public componentDidUpdate(prevProps: Readonly<GameFormComponentProperties>) {
        if (prevProps.game && !this.props.game && this.formRef.current) {
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

    private renderForm = (props: FormikProps<GameDataWithImage>) => {
        return <Form>
            <div className="row">
                <Field<GameDataWithImage> name="name" label="Name" type="text" />
                <Field<GameDataWithImage> name="bggLink" label="BGG Link" type="text" />
                <Field<GameDataWithImage> name="maxPlayers" label="Max Players" type="number" />
                <Field<GameDataWithImage> name="image" label="Image" type="file" component={FileField} />
            </div>
            <button className="button-primary" type="submit">Save</button>
        </Form>;
    }

    private handleSubmit = (values: GameDataWithImage) => {
        this.props.saveGame(values, this.props.game ? this.props.game.id : '');
    }
}