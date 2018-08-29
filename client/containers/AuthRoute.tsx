import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { History } from 'history';
import authAPI from '../utils/auth';

type LocationDescriptor<S> = History.LocationDescriptor<S>;
interface IAuthRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}
export interface IAuthRedirectState {
  from: LocationDescriptor<any>;
}

function AuthRoute(props: IAuthRouteProps) {
  const { component: Component, ...rest } = props;
  const render = (renderProps: RouteProps) => {
    // tslint:disable-next-line:no-console
    console.warn({ renderProps });
    // tslint:disable-next-line:no-console
    console.log(authAPI.isAuthenticated);

    if (authAPI.isAuthenticated) {
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

export default AuthRoute;
