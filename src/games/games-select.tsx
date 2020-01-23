import * as React from 'react';
import * as Formik from 'formik';
import { ObjectSelectField } from 'common/components/object-select-field';
import { Game, Document } from 'models';
import { useGames } from 'firebase-hooks/games';

export const GamesSelect = (props: Formik.FieldProps<Document<Game>> & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'form'>): JSX.Element => {
    const [games] = useGames();

    return <ObjectSelectField<Document<Game>>
        values={games}
        keySelector={gameKeySelector}
        labelSelector={gameLabelSelector}
        {...props} />;

    function gameKeySelector(game: Document<Game>) {
        return game.id;
    }

    function gameLabelSelector(game: Document<Game>) {
        return game.data.name;
    }
}