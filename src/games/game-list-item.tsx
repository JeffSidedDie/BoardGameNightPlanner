import * as React from 'react';
import { GameDocument } from 'src/common/models';

export interface GameListItemProperties {
    readonly game: GameDocument;
    readonly selected: boolean;
    readonly selectGame: (game: GameDocument) => void;
}

export class GameListItem extends React.Component<GameListItemProperties> {
    public render() {
        return <tr className={this.props.selected ? 'bg-light' : ''} onClick={this.handleItemClick}>
            <td>{this.props.game.data.name}</td>
            <td>{this.props.game.data.maxPlayers}</td>
        </tr>;
    }

    private handleItemClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
        this.props.selectGame(this.props.game);
    }
}