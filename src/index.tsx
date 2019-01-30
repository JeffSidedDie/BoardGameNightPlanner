import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// redux
import { Provider } from 'react-redux';
import { Router, Switch } from 'react-router';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { AuthReducer, AuthRoute, AuthState } from 'src/auth';
import { AppAction } from 'src/common/redux';

// routing
import { Routes } from 'src/common/routes';

// css
import 'node_modules/bulma/css/bulma.css';

// service worker
// import registerServiceWorker from './registerServiceWorker';

// app
import { Navbar } from 'src/common/components/navbar.container';
import { EventForm, Events, EventsReducer, EventsState } from 'src/events';
import { GamesList, GamesReducer, GamesState } from './games';

const history = createBrowserHistory();

export interface AppState {
    readonly auth: AuthState;
    readonly events: EventsState;
    readonly games: GamesState;
}

export const store = createStore<AppState, AppAction, {}, {}>(
    combineReducers<AppState, AppAction>({
        auth: AuthReducer,
        events: EventsReducer,
        games: GamesReducer,
    }),
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Navbar />
                <Switch>
                    <AuthRoute path={Routes.Root} exact={true} component={Events} />
                    <AuthRoute path={Routes.Events_Edit} component={EventForm} />
                    <AuthRoute path={Routes.Games_List} component={GamesList} />
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
