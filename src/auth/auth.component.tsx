import 'firebaseui/dist/firebaseui.css';
import * as React from 'react';
import { Login } from 'src/auth/login.container';

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
                </div>
                : <Login />
            }
        </>;
    }
}