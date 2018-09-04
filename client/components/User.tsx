import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Button, Menu, Dropdown, Icon } from 'antd';
import { IReduxState } from '../reducers';
import {
  IUserInfo,
  userLogout, UserLogoutAction,
  toggleSignModalVisible, SignModalVisibleAction,
  setSignModalType, SignModalTypeAction, SignModalType,
  toggleSignModalLoading, SignModalLoadingAction,
} from '../actions/user';
import 'antd/lib/button/style';
import 'antd/lib/menu/style';
import 'antd/lib/dropdown/style';
import 'antd/lib/icon/style';
import './User.less';

interface IStateProps {
  logged: boolean;
  userInfo: IUserInfo;
}
interface IActionProps {
  actions: {
    userLogout(): UserLogoutAction;
    toggleSignModalVisible(visible: boolean): SignModalVisibleAction;
    setSignModalType(type: SignModalType): SignModalTypeAction;
    toggleSignModalLoading(loading: boolean): SignModalLoadingAction;
  };
}
interface IUserAvatarProps {
  name?: string;
}

function UserAvatar(props: IUserAvatarProps) {
  const name: string = props.name || '';
  const avatar = name.length === 0 ? '无名'
    : name.length === 1 ? (name + name)
      : name.substr(name.length - 2);
  return <span className="user-avatar">{avatar}</span>;
}

const mapStateToProps: MapStateToProps<IStateProps, {}, IReduxState> = (state: IReduxState) => ({
  logged: state.user.logged,
  userInfo: state.user.info,
});
const mapDispatchToProps: MapDispatchToProps<IActionProps, {}> = (dispatch) => ({
  actions: bindActionCreators({
    userLogout,
    toggleSignModalVisible,
    setSignModalType,
    toggleSignModalLoading,
  }, dispatch),
});

class User extends Component<IStateProps & IActionProps> {
  public componentWillMount() {
    // todo
  }

  public render() {
    return (
      <div className="user-container">
        {this.renderUser()}
      </div>
    );
  }
  private renderUser = () => {
    const { logged, userInfo } = this.props;
    if (logged) {
      return (
        <span className="welcome-user">
          <UserAvatar name={userInfo.username} />
          <Dropdown overlay={this.renderDropMenu()}>
            <Button className="user-name">{userInfo.username}<Icon type="down" /></Button>
          </Dropdown>
        </span>
      );
    }
    return (
      <Fragment>
        <Button onClick={this.handleSignupClick} className="user-operator-button">注册</Button>
        <Button onClick={this.handleSigninClick} className="user-operator-button">登录</Button>
      </Fragment>
    );
  }
  private renderDropMenu = () => {
    return (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="logout">退出登录</Menu.Item>
      </Menu>
    );
  }
  private handleMenuClick = (ev) => {
    const { actions } = this.props;
    switch (ev.key) {
      case 'logout':
        actions.userLogout();
        break;
      default:
        // console.log('ev.key', ev.key);
        return;
    }
  }

  private handleSigninClick = (ev) => {
    const { actions } = this.props;
    actions.setSignModalType(SignModalType.signin);
    actions.toggleSignModalVisible(true);
    switch (ev.key) {
      case 'logout':
        actions.userLogout();
        break;
      default:
        // console.log('ev.key', ev.key);
        return;
    }
  }

  private handleSignupClick = (ev) => {
    const { actions } = this.props;
    actions.setSignModalType(SignModalType.signup);
    actions.toggleSignModalVisible(true);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
