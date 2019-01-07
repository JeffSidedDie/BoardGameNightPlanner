import * as React from 'react';
import { GeneratedLink } from 'src/common/generatedLink';
import { GameListElement } from 'src/common/models';
import { Routes } from 'src/common/routes';

export interface GamesListComponentProperties {
    readonly error?: string;
    readonly games?: GameListElement[];
    readonly subscribeGames: () => void;
    readonly unsubscribeGames: () => void;
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

    private renderGamesTable(games?: GameListElement[]) {
        return <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Max Players</th>
                </tr>
            </thead>
            <tbody>
                {games && this.renderGamesRows(games)}
            </tbody>
        </table>;
    }

    private renderGamesRows(games: GameListElement[]) {
        return games.map((g, index) => {
            return <tr key={index} className="bg-light">
                <td><GeneratedLink route={Routes.Games_Edit} parameters={{ id: g.id }}>{g.data.name}</GeneratedLink></td>
                <td>{g.data.maxPlayers}</td>
            </tr>;
        });
    }
}