import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Count from './Count';
import Hello from './Hello';

class App extends Component {
  public componentDidMount() {
    // todo
  }

  public render() {
    return (
      <div>
        <Count maxCount={4} />
        <Hello />
      </div>
    );
  }
}

export default hot(module)(App);
