import * as React from 'react';
import { Redirect } from 'react-router';
import { Routes } from 'src/common/routes';

export interface ILogoutComponentProperties {
    readonly logout: () => void;
    readonly userId?: string;
}

export class LogoutComponent extends React.Component<ILogoutComponentProperties> {

    public render() {
        return <>
            {this.props.userId
                ? <div>
                    {/* {this.props.userId} */}
                    <p><button type="button" onClick={this.props.logout}>Logout</button></p>
                </div>
                : <Redirect to={Routes.Root} />
            }
        </>;
    }
}