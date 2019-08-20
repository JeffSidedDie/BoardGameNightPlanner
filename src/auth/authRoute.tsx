import * as React from 'react';
import { Route, RouteProps } from 'react-router';
import { User, Document } from 'models';

export interface AuthRouteProperties extends RouteProps {
    readonly user: Document<User> | null;
}

export const AuthRoute: React.FC<AuthRouteProperties> = (props) => {
    return props.user ? <Route {...props} /> : null;
}