import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// redux
import { Provider } from 'react-redux';
import { Router, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Auth, AuthReducer, AuthRoute, AuthState } from 'src/auth';
import { AppAction } from 'src/common/redux';

// routing
import { Routes } from 'src/common/routes';

// css
import 'skeleton-css/css/normalize.css';
import 'skeleton-css/css/skeleton.css';
import './bootstrap-utils.css';
import './index.css';

// service worker
// import registerServiceWorker from './registerServiceWorker';

// app
import { Events, EventsReducer, EventsState } from 'src/events';
import { Games, GamesReducer, GamesState } from './games';

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
      <div className="h-100">
        <nav className="appbar d-flex align-items-center p-3">
          <div className="flex-fill">
            <h1 className="p-0 m-0">Board Game Night Planner</h1>
          </div>
          <Link to={Routes.Root}>Home</Link>
          <Link to={Routes.Games_Create}>Games</Link>
          <div>
            <Auth />
          </div>
        </nav>
        <div className="container h-100">
          <Switch>
            <AuthRoute path={Routes.Root} exact={true} component={Events} />
            <AuthRoute path={Routes.Games_Edit} component={Games} />
          </Switch>
        </div>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
