import * as React from 'react';
import { Route, RouteProps } from 'react-router';

export interface AuthRouteComponentProperties extends RouteProps {
    readonly userId?: string;
}

export class AuthRouteComponent extends React.Component<AuthRouteComponentProperties> {

    public render() {
        return this.props.userId ? <Route {...this.props} /> : null;
    }
}