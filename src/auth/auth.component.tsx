import * as React from 'react';
import { Login } from './login.component';
import { Logout } from './logout.component';

export interface AuthComponentProperties {
    readonly loginStart: (elementId: string) => void;
    readonly logout: () => void;
    readonly userId?: string;
}

export class AuthComponent extends React.Component<AuthComponentProperties> {

    public render() {
        return <>
            {this.props.userId
                ? <Logout userId={this.props.userId} logout={this.props.logout} />
                : <Login userId={this.props.userId} loginStart={this.props.loginStart} />
            }
        </>;
    }
}