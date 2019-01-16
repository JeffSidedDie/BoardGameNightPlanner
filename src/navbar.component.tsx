import * as React from 'react';

import logo from './assets/logo.jpg';

import { Auth } from 'src/auth';
import { GeneratedLink } from 'src/common/generatedLink';
import { Routes } from 'src/common/routes';

export interface NavbarComponentProperties {
  readonly userId?: string;
}

export class NavbarComponent extends React.Component<NavbarComponentProperties> {
  public render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <GeneratedLink className="navbar-item" route={Routes.Root}>
            <img src={logo} />
            &nbsp; Board Game Night Planner
          </GeneratedLink>
        </div>

        <div className="navbar-menu">
          {this.props.userId && 
            <div className="navbar-start">
              <GeneratedLink className="navbar-item" route={Routes.Root}>
                Home
              </GeneratedLink>
              <GeneratedLink className="navbar-item" route={Routes.Games_List}>
                Games
              </GeneratedLink>
            </div>
          }

          <div className="navbar-end">
            <div className="navbar-item">
              <Auth />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
