import React, { Component, Fragment } from 'react';
import { hot } from 'react-hot-loader';
import Routes from '../config/router';
import Links from '../config/links';

class App extends Component {
  public componentDidMount() {
    // todo
  }

  public render() {
    return (
      <Fragment>
        <Links />
        <Routes />
      </Fragment>
    );
  }
}

export default hot(module)(App);
