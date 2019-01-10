import * as React from 'react';
import { GameData, GameDocument } from 'src/common/models';
import { GameListItem } from './game-list-item';
import { GamesForm } from './games-form';

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
        return <>
            <h1>Games</h1>
            <div className="row">
                <div className="six columns">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Max Players</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.games && this.props.games.map((g, index) => <GameListItem key={index} game={g} selected={this.props.selectedGame === g} selectGame={this.props.selectGame} />)}
                        </tbody>
                    </table>
                </div>
                <div className="six columns">
                    <GamesForm game={this.props.selectedGame} saveGame={this.props.saveGame} />
                </div>
            </div>
            <span>{this.props.error}</span>
        </>;
    }
}