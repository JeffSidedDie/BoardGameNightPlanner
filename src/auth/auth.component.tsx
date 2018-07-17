import * as React from 'react';
import { Login } from 'src/auth/login.component';
import { Logout } from 'src/auth/logout.component';

export interface IAuthComponentProperties {
    readonly loginStart: (elementId: string) => void;
    readonly logout: () => void;
    readonly userId?: string;
}

export class AuthComponent extends React.Component<IAuthComponentProperties> {

    public render() {
        return <>
            {this.props.userId
                ? <Logout userId={this.props.userId} logout={this.props.logout} />
                : <Login userId={this.props.userId} loginStart={this.props.loginStart} />
            }
        </>;
    }
}