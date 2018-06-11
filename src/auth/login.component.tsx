import 'firebaseui/dist/firebaseui.css';
import * as React from 'react';

export interface ILoginComponentProperties {
    readonly loginStart: (elementId: string) => void;
}

export class LoginComponent extends React.Component<ILoginComponentProperties> {

    public componentDidMount() {
        this.props.loginStart('#firebaseui-auth-container');
    }

    public render() {
        return <div id="firebaseui-auth-container" />;
    }
}