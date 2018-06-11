import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Auth, AuthReducer, IAuthState } from 'src/auth';
import { IAppAction } from 'src/common/redux';
import { Routes } from 'src/common/routes';
import { Events, EventsReducer, IEventsState } from 'src/events';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

export const history = createBrowserHistory();

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
      <div>
        <Route path={Routes.Root} component={Auth} />
        <Route path={Routes.Events} component={Events} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
