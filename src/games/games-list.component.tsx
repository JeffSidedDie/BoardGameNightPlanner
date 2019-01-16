import * as React from 'react';
import { GameData, GameDocument } from 'src/common/models';
import { GameForm } from './game-form';
import { GameListItem } from './game-list-item';

export interface GamesListComponentProperties {
    readonly error?: string;
    readonly games?: GameDocument[];
    readonly selectedGame?: GameDocument;
    readonly subscribeGames: () => void;
    readonly unsubscribeGames: () => void;
    readonly selectGame: (game: GameDocument) => void;
    readonly saveGame: (game: GameData, id?: string) => void;
}

export class GamesListComponent extends React.Component<GamesListComponentProperties> {

    public componentDidMount() {
        this.props.subscribeGames();
    }

    public componentWillUnmount() {
        this.props.unsubscribeGames();
    }

    public render() {
        return <section className="section">
            <div className="container">
                <h1 className="title">Games</h1>
                <table className="table">
                    <thead className="thead">
                        <tr className="tr">
                            <th className="th">Name</th>
                            <th className="th">Max Players</th>
                        </tr>
                    </thead>
                    <tbody className="tbody">
                        {this.props.games && this.props.games.map((g, index) =>
                            <GameListItem key={index}
                                game={g}
                                selected={this.props.selectedGame === g}
                                selectGame={this.props.selectGame}
                            />
                        )}
                    </tbody>
                </table>
                <GameForm game={this.props.selectedGame} saveGame={this.props.saveGame} />
                <span>{this.props.error}</span>
            </div>
        </section>;
    }
}