import * as React from 'react';
import { ObjectSelectField, ObjectSelectFieldProperties } from 'src/common/components/object-select-field';
import { GameDocument } from 'src/common/models';

export interface GamesSelectComponentProperties<T> extends ObjectSelectFieldProperties<T, GameDocument> {
    readonly games: GameDocument[];
    readonly subscribeGames: () => void;
    readonly unsubscribeGames: () => void;
}

export class GamesSelectComponent<T> extends React.Component<GamesSelectComponentProperties<T>> {

    public componentDidMount() {
        this.props.subscribeGames();
    }

    public componentWillUnmount() {
        this.props.unsubscribeGames();
    }

    public render() {
        return <ObjectSelectField<T, GameDocument>
            values={this.props.games}
            keySelector={this.gameKeySelector}
            labelSelector={this.gameLabelSelector}
            {...this.props} />;
    }

    private gameKeySelector = (game: GameDocument) => game.id;
    private gameLabelSelector = (game: GameDocument) => game.data.name;
}