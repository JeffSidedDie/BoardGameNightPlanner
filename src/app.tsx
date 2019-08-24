import 'bulma/css/bulma.css';

import { AuthRoute } from 'auth';
import { Navbar } from 'common/components/navbar';
import { Routes } from 'common/routes';
import { useCurrentUser } from 'firebase-hooks/auth';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import { Router, Switch } from 'react-router';
import { Events, EventForm, MyEvents } from './events'; //Have to do this one relative to prevent conflict with events NodeJS module
import { GamesList } from 'games';

const history = createBrowserHistory();

export const App: React.FC = () => {
    const user = useCurrentUser();

    return <>
        <Router history={history}>
            <Navbar user={user} />
            <Switch>
                <AuthRoute path={Routes.Root} exact={true} user={user} render={renderEvents} />
                <AuthRoute path={Routes.Events_MyEvents} user={user} render={renderMyEvents} />
                <AuthRoute path={Routes.Events_Edit} user={user} component={EventForm} />
                <AuthRoute path={Routes.Games_List} user={user} component={GamesList} />
            </Switch>
        </Router>
    </>;

    function renderMyEvents() {
        return <MyEvents user={user!} />
    }

    function renderEvents() {
        return <Events user={user!} />
    }
}
