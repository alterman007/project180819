import React from 'react';
// import { compose } from 'redux';
import { connect, MapStateToProps } from 'react-redux';
import { Route, Redirect, RouteProps, withRouter, RouteComponentProps } from 'react-router-dom';
import { LocationDescriptor } from 'history';
import { IReduxState } from '../reducers';

interface IStateProps {
  logged: boolean;
}

type IOwnerProps = RouteProps;
// interface IAuthRouteProps extends RouteProps {
//   component: React.ComponentType<any>;
// }

export interface IAuthRedirectState {
  from: LocationDescriptor<any>;
}

const mapStateToProps: MapStateToProps<IStateProps, {}, IReduxState> = (state: IReduxState) => ({
  logged: state.user.logged,
});

function AuthRoute(props: IOwnerProps & IStateProps) {
  const { component: Component, logged, ...rest } = props;
  const render = (renderProps: RouteComponentProps<{}>) => {
    if (logged) {
      return <Component {...renderProps} />;
    }
    const redirectToProps: LocationDescriptor<IAuthRedirectState> = {
      pathname: '/login',
      state: { from: renderProps.location },
    };
    return <Redirect to={redirectToProps} />;
  };
  // console.log({ rest, props });
  return (
    <Route
      {...rest}
      render={render}
    />
  );
}

export default withRouter<any>(
  connect<IStateProps, {}, IOwnerProps, IReduxState>(mapStateToProps)(AuthRoute),
);

// export default compose(withRouter, connect(mapStateToProps))(AuthRoute);
