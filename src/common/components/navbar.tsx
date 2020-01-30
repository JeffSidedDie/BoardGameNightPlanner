import logo from 'assets/logo.jpg';

import React from 'react';
import { GeneratedLink } from 'common/components/generatedLink';
import { Routes } from 'common/routes';
import { useState } from 'react';
import { Document, User } from 'models';
import { Logout, Login } from 'auth';

export interface NavbarProperties {
    readonly user: Document<User> | null;
}

const Logo: React.FC = () => {
    return <>
        <img src={logo} alt="logo" /> Board Game Night Planner
    </>;
}
const NavbarLogo = <Logo />;

export const Navbar: React.FC<NavbarProperties> = (props) => {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <GeneratedLink className="navbar-item" route={Routes.Root}>
                    {NavbarLogo}
                </GeneratedLink>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a role="button" className={showMenu ? 'navbar-burger burger is-active' : 'navbar-burger burger'} aria-label="menu" aria-expanded="false" onClick={toggleShowMenu}>
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </a>
            </div>

            <div className={showMenu ? 'navbar-menu is-active' : 'navbar-menu'}>
                {props.user &&
                    <div className="navbar-start">
                        <GeneratedLink className="navbar-item" route={Routes.Events_MyEvents}>My Events</GeneratedLink>
                        {props.user.data.isAdmin && <>
                            <GeneratedLink className="navbar-item" route={Routes.Events_Edit} parameters={{ id: undefined }}>Create Event</GeneratedLink>
                            <GeneratedLink className="navbar-item" route={Routes.Games_List}>Games</GeneratedLink>
                        </>}
                    </div>
                }

                <div className="navbar-end">
                    <div className="navbar-item">
                        {props.user ? <Logout /> : <Login />}
                    </div>
                </div>
            </div>
        </nav>
    );

    function toggleShowMenu() {
        setShowMenu(!showMenu);
    }
}
Navbar.whyDidYouRender = true;