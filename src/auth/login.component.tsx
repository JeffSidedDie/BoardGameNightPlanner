import 'firebaseui/dist/firebaseui.css';
import * as React from 'react';
import { Redirect } from 'react-router';
import { Routes } from 'src/common/routes';

export interface ILoginComponentProperties {
    readonly loginStart: (elementId: string) => void;
    readonly userId?: string;
}

export class LoginComponent extends React.Component<ILoginComponentProperties> {

    public componentDidMount() {
        this.props.loginStart('#firebaseui-auth-container');
    }

    public render() {
        return <>
            {this.props.userId
                ? <Redirect to={Routes.Events} />
                : <div id="firebaseui-auth-container" />
            }
        </>;
    }
}