import * as React from 'react';
import { Game, Document } from 'models';

export interface GameListItemProperties {
    readonly game: Document<Game>;
    readonly selected: boolean;
    readonly selectGame: (game: Document<Game>) => void;
}

export const GameListItem: React.FC<GameListItemProperties> = (props) => {
    return <tr className={props.selected ? 'tr is-selected' : 'tr'} onClick={handleItemClick}>
        <td className="td">{props.game.data.name}</td>
        <td className="td">{props.game.data.maxPlayers}</td>
    </tr>;

    function handleItemClick(event: React.MouseEvent<HTMLTableRowElement>) {
        props.selectGame(props.game);
    }
}