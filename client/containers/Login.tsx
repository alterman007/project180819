import React from 'react';
import { bindActionCreators } from 'redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import LoginForm from '../components/LoginForm';
import { IAuthRedirectState } from './AuthRoute';
import { userLogin, IUserLoginArgs, UserLoginAction } from '../actions/user';
import { IReduxState } from '../reducers';

interface IStateProps {
  logged: boolean;
}
interface IActionProps {
  actions: {
    userLogin(payload: IUserLoginArgs): UserLoginAction;
  };
}
type LoginRouteProps = RouteComponentProps<any, {}, IAuthRedirectState>;

const mapStateToProps: MapStateToProps<IStateProps, {}, IReduxState> = (state: IReduxState) => ({
  logged: state.user.logged,
});
const mapDispatchToProps: MapDispatchToProps<IActionProps, {}> = (dispatch) => ({
  actions: bindActionCreators({ userLogin }, dispatch),
});

class Login extends React.Component<LoginRouteProps & IStateProps & IActionProps> {
  public render() {
    const { logged, location } = this.props;
    const locationState: IAuthRedirectState = location.state || { from: '/' };
    if (logged) {
      return <Redirect to={locationState.from} />;
    }
    return <LoginForm onFormSubmit={this.handleSubmit} />;
  }
  private handleSubmit = (value: IUserLoginArgs): void => {
    const { actions } = this.props;
    // console.log(form.getFieldsValue());
    actions.userLogin(value);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
