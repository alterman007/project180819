import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect, MapDispatchToProps } from 'react-redux';
import { withRouter } from 'react-router';
import { hot } from 'react-hot-loader';
import Header from './Header';
import Modals from './Modals';
import Routes from '../config/router';
import Links from '../config/links';
import { appStart, IAppStart } from '../actions';
import './app.less';

interface IActionProps {
  actions: {
    appStart(): IAppStart,
  };
}
const mapDispatchToProps: MapDispatchToProps<IActionProps, {}> = (dispatch) => ({
  actions: bindActionCreators({
    appStart,
  }, dispatch),
});

class App extends Component<IActionProps> {
  public componentWillMount() {
    // todo
    // setTimeout(this.props.actions.appStart, 5000);
    this.props.actions.appStart();
  }

  public render() {
    return (
      <div className="app-container">
        <Header />
        <Links />
        <Routes />
        <Modals />
      </div>
    );
  }
}

export default hot(module)(withRouter<any>(connect(null, mapDispatchToProps)(App)));
