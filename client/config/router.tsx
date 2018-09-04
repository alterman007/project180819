import React, { Fragment } from 'react';
import {
  Route,
  // Switch,
} from 'react-router-dom';
import AuthRoute from '../containers/AuthRoute';
import Hello from '../containers/Hello';
import Count from '../containers/Count';
import Login from '../containers/Login';

export default () => (
  <Fragment>
    <Route path="/" component={Hello} exact={true} />
    <Route path="/login" component={Login} />
    <AuthRoute path="/hello" component={Hello} />
    <Route path="/count" component={Count} />
  </Fragment>
);
