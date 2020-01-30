import * as React from 'react';
import { Game, Document } from 'models';
import { GameForm } from './game-form';
import { useGames } from 'firebase-hooks/games';
import { useState } from 'react';
import { GameListItem } from './game-list-item';

const GamesListTable: React.FC = () => {
    const [games, gamesError] = useGames();
    return <>
        <table className="table">
            <thead className="thead">
                <tr className="tr">
                    <th className="th">Name</th>
                    <th className="th">Max Players</th>
                </tr>
            </thead>
            <tbody className="tbody">
                {games.map((g, i) =>
                    <GameListItem key={g.id} game={g} />
                )}
            </tbody>
        </table>
        <span>{gamesError}</span>
    </>;
};
GamesListTable.whyDidYouRender = true;

interface SelectedGame {
    readonly selectedGame: Document<Game> | null;
    readonly setSelectedGame: (game: Document<Game> | null) => void;
}
export const SelectedGameContext = React.createContext<SelectedGame>({ selectedGame: null, setSelectedGame: () => { } })

const SelectGameContextProvider: React.FC = (props) => {
    const [selectedGame, setSelectedGame] = useState<Document<Game> | null>(null);
    return <SelectedGameContext.Provider value={{ selectedGame, setSelectedGame }}>{props.children}</SelectedGameContext.Provider>
}

export const GamesList: React.FC = () => {

    return <section className="section">
        <div className="container">
            <h1 className="title">Games</h1>
            <SelectGameContextProvider>
                <div className="columns">
                    <div className="column is-half">
                        <GamesListTable />
                    </div>
                    <div className="column is-half">
                        <GameForm />
                    </div>
                </div>
            </SelectGameContextProvider>
        </div>
    </section>;
}
GamesList.whyDidYouRender = true;