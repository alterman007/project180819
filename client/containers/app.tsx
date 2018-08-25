import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Count from './Count';

class App extends Component {
  public componentDidMount() {
    // todo
  }

  public render() {
    return <Count maxCount={4} />;
  }
}

export default hot(module)(App);
