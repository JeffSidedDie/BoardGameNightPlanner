import * as React from 'react';
import { Auth } from 'src/auth';
import './home.css';
import logo from './logo.svg';

export class Home extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Auth />
      </div>
    );
  }
}