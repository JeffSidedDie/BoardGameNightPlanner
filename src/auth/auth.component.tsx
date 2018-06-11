import * as React from 'react';
import { Login } from './login.container';
import { Logout } from './logout.container';

export interface IAuthComponentProperties {
    readonly logout: () => void;
    readonly userId?: string;
}

export class AuthComponent extends React.Component<IAuthComponentProperties> {

    public render() {
        return <>
            {this.props.userId
                ? <Logout />
                : <Login />
            }
        </>;
    }
}