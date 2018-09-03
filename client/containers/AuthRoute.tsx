import React from 'react';
import { compose } from 'redux';
import { connect, MapStateToProps } from 'react-redux';
import { Route, Redirect, RouteProps, withRouter } from 'react-router-dom';
import { LocationDescriptor } from 'history';
import { IReduxState } from '../reducers';

interface IStateProps {
  logged: boolean;
}
interface IAuthRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

export interface IAuthRedirectState {
  from: LocationDescriptor<any>;
}

const mapStateToProps: MapStateToProps<IStateProps, {}, IReduxState> = (state: IReduxState) => ({
  logged: state.user.logged,
});

function AuthRoute(props: IAuthRouteProps & IStateProps) {
  const { component: Component, logged, ...rest } = props;
  const render = (renderProps: RouteProps) => {
    if (logged) {
      return <Component {...renderProps} />;
    }
    const redirectToProps: LocationDescriptor<IAuthRedirectState> = {
      pathname: '/login',
      state: { from: renderProps.location },
    };
    return <Redirect to={redirectToProps} />;
  };
  return (
    <Route
      {...rest}
      render={render}
    />
  );
}

export default compose(withRouter, connect(mapStateToProps))(AuthRoute);
