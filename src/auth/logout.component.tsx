import * as React from 'react';

export interface LogoutComponentProperties {
  readonly logout: () => void;
  readonly userId?: string;
}

export class Logout extends React.Component<LogoutComponentProperties> {
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
