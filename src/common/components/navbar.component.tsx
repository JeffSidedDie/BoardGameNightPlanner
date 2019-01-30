import * as React from 'react';

import logo from 'src/assets/logo.jpg';

import { Auth } from 'src/auth';
import { GeneratedLink } from 'src/common/components/generatedLink';
import { Routes } from 'src/common/routes';

export interface NavbarComponentProperties {
    readonly userId?: string;
    readonly userIsAdmin?: boolean;
}

interface NavbarComponentState {
    readonly showMenu: boolean;
}

export class NavbarComponent extends React.Component<NavbarComponentProperties, NavbarComponentState> {

    public render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <GeneratedLink className="navbar-item" route={Routes.Root}>
                        <img src={logo} /> Board Game Night Planner
                    </GeneratedLink>
                    <a role="button" className={this.state && this.state.showMenu ? 'navbar-burger burger is-active' : 'navbar-burger burger'} aria-label="menu" aria-expanded="false" onClick={this.handleShowMenu}>
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                    </a>
                </div>

                <div className={this.state && this.state.showMenu ? 'navbar-menu is-active' : 'navbar-menu'}>
                    {this.props.userIsAdmin &&
                        <div className="navbar-start">
                            <GeneratedLink className="navbar-item" route={Routes.Root}>Home</GeneratedLink>
                            <GeneratedLink className="navbar-item" route={Routes.Games_List}>Games</GeneratedLink>
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

    private handleShowMenu = (e: React.MouseEvent) => {
        this.setState((state, props) => {
            return {
                ...state,
                showMenu: state ? !state.showMenu : true,
            };
        });
    }
}
