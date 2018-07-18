import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// redux
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Auth, AuthReducer, AuthRoute, IAuthState } from 'src/auth';
import { IAppAction } from 'src/common/redux';

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
import { Events, EventsReducer, IEventsState } from 'src/events';

const history = createBrowserHistory();

export interface IAppState {
  readonly auth: IAuthState;
  readonly events: IEventsState;
}

export const store = createStore<IAppState, IAppAction, {}, {}>(
  combineReducers<IAppState, IAppAction>({
    auth: AuthReducer,
    events: EventsReducer,
  }),
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div className="h-100">
        <nav className="appbar d-flex align-items-center p-3 mb-4">
          <div className="flex-fill">
            <h1 className="p-0 m-0">Board Game Night Planner</h1>
          </div>
          <div>
            <Route path={Routes.Root} component={Auth} />
          </div>
        </nav>
        <div className="container h-100">
          <Switch>
            <AuthRoute component={Events} />
          </Switch>
        </div>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
