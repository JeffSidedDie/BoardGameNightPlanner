import * as React from 'react';
import { Game, Document } from 'models';
import { SelectedGameContext } from './games-list';

export interface GameListItemProperties {
    readonly game: Document<Game>;
}

export const GameListItem: React.FC<GameListItemProperties> = (props) => {
    const selectedGameContext = React.useContext(SelectedGameContext);

    return <tr className={selectedGameContext.selectedGame === props.game ? 'tr is-selected' : 'tr'} onClick={handleItemClick}>
        <td className="td">{props.game.data.name}</td>
        <td className="td">{props.game.data.maxPlayers}</td>
    </tr>;

    function handleItemClick(event: React.MouseEvent<HTMLTableRowElement>) {
        selectedGameContext.setSelectedGame(props.game);
    }
}
GameListItem.whyDidYouRender = true;