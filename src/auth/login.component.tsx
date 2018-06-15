import 'firebaseui/dist/firebaseui.css';
import * as React from 'react';
import './login.css';

export interface ILoginComponentProperties {
  readonly loginStart: (elementId: string) => void;
  readonly userId?: string;
}

export class LoginComponent extends React.Component<ILoginComponentProperties> {
  public componentDidMount() {
    this.props.loginStart('#firebaseui-auth-container');
  }

  public render() {
    return <>{!this.props.userId && <div id="firebaseui-auth-container" />}</>;
  }
}
