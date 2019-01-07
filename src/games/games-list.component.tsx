import * as React from 'react';
import { Game, GameDocument } from 'src/common/models';
import { GamesForm } from './games-form';

export interface GamesListComponentProperties {
    readonly error?: string;
    readonly games?: GameDocument[];
    readonly selectedGame?: GameDocument;
    readonly subscribeGames: () => void;
    readonly unsubscribeGames: () => void;
    readonly selectGame: (game: GameDocument) => void;
    readonly saveGame: (game: Game, id?: string) => void;
}

export class GamesListComponent extends React.Component<GamesListComponentProperties> {

    public componentDidMount() {
        this.props.subscribeGames();
    }

    public componentWillUnmount() {
        this.props.unsubscribeGames();
    }

    public render() {
        return <>
            <h1>Games</h1>
            {this.renderGamesTable(this.props.games)}
            <span>{this.props.error}</span>
        </>;
    }

    private renderGamesTable(games?: GameDocument[]) {
        return <div className="row">
            <div className="six columns">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Max Players</th>
                        </tr>
                    </thead>
                    <tbody>
                        {games && this.renderGamesRows(games)}
                    </tbody>
                </table>
            </div>
            <div className="six columns">
                <GamesForm game={this.props.selectedGame} saveGame={this.props.saveGame} />
            </div>
        </div>;
    }

    private renderGamesRows(games: GameDocument[]) {
        return games.map((g, index) => {
            return <tr key={index} className={this.props.selectedGame === g ? 'bg-light' : ''} onClick={this.handleSelectGame(g)}>
                <td>{g.data.name}</td>
                <td>{g.data.maxPlayers}</td>
            </tr>;
        });
    }

    private handleSelectGame(game: GameDocument) {
        const t = this;
        return (event: React.MouseEvent) => {
            t.props.selectGame(game);
        };
    }
}