import * as React from 'react';
import { Link } from 'react-router-dom';
import { generateRoute, Routes } from './routes';

export interface GeneratedLinkProperties {
    readonly route: Routes;
    readonly parameters?: { [property: string]: string | number | undefined };
    className: string;
}

export class GeneratedLink extends React.Component<GeneratedLinkProperties> {
    public render() {
        return <Link className={this.props.className} to={generateRoute(this.props.route, this.props.parameters)}>{this.props.children}</Link>;
    }
}