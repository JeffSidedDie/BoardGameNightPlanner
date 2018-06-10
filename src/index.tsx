import * as firebase from 'firebase';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Home } from './home';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const config = {
  apiKey: "AIzaSyDWMGvNAvl10PX6nP0Fzar6Jtv1g6RNlyk",
  authDomain: "board-game-night-planner.firebaseapp.com",
  databaseURL: "https://board-game-night-planner.firebaseio.com",
  messagingSenderId: "622458243132",
  projectId: "board-game-night-planner",
  storageBucket: "board-game-night-planner.appspot.com",
};
export const firebaseApp = firebase.initializeApp(config);

ReactDOM.render(
  <Home />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
