import * as React from 'react';
import { Game, Document } from 'models';
import { GameForm } from './game-form';
import { useGames } from 'firebase-hooks/games';
import { useState } from 'react';
import { GameListItem } from './game-list-item';

export const GamesList: React.FC = () => {
    const [games, gamesError] = useGames();
    const [selectedGame, setSelectedGame] = useState<Document<Game> | null>(null);

    return <section className="section">
        <div className="container">
            <h1 className="title">Games</h1>
            <div className="columns">
                <div className="column is-half">
                    <table className="table">
                        <thead className="thead">
                            <tr className="tr">
                                <th className="th">Name</th>
                                <th className="th">Max Players</th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {games.map((g, i) =>
                                <GameListItem key={g.id}
                                    game={g}
                                    selected={selectedGame === g}
                                    selectGame={setSelectedGame}
                                />
                            )}
                        </tbody>
                    </table>
                    <span>{gamesError}</span>
                </div>
                <div className="column is-half">
                    <GameForm game={selectedGame} onSubmit={clearSelectedGame} />
                </div>
            </div>
        </div>
    </section>;

    function clearSelectedGame() {
        setSelectedGame(null);
    }
}