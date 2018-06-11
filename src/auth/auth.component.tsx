import * as React from 'react';
import { Redirect } from 'react-router';
import { Login } from 'src/auth/login.container';
import { Routes } from 'src/common/routes';

export interface IAuthComponentProperties {
    readonly logout: () => void;
    readonly userId?: string;
}

export class AuthComponent extends React.Component<IAuthComponentProperties> {

    public render() {
        return <>
            {this.props.userId
                ? <div>
                    {this.props.userId}
                    <p><button type="button" onClick={this.props.logout}>Logout</button></p>
                    <Redirect to={Routes.Events} />
                </div>
                : <Login />
            }
        </>;
    }
}