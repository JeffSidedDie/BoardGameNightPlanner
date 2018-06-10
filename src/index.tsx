import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { AuthReducer, IAuthState } from 'src/auth';
import { IAppAction } from './common/redux';
import { Home } from './home';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

export interface IAppState {
  readonly auth: IAuthState;
}

export const store = createStore<IAppState, IAppAction, {}, {}>(
  combineReducers({
    auth: AuthReducer,
  })
);

ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
