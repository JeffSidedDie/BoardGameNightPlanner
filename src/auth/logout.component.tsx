import * as React from 'react';

export interface ILogoutComponentProperties {
  readonly logout: () => void;
  readonly userId?: string;
}

export class LogoutComponent extends React.Component<
  ILogoutComponentProperties
> {
  public render() {
    return (
      <>
        {this.props.userId && (
          <div>
            <button className="m-0" type="button" onClick={this.props.logout}>
              Logout
            </button>
          </div>
        )}
      </>
    );
  }
}
