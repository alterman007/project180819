import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Modal, Button, Form, Input } from 'antd';
import { IReduxState } from '../reducers';
import {
  toggleSignModalVisible, SignModalVisibleAction, SignModalType,
  userSignup, UserSignupAction, IUserSignupArgs,
  userLogin, UserLoginAction, IUserLoginArgs,
} from '../actions/user';
import 'antd/lib/modal/style';
import 'antd/lib/button/style';

interface IStateProps {
  visible: boolean;
  type: SignModalType;
  loading: boolean;
}
interface IActionProps {
  actions: {
    toggleSignModalVisible(visible: boolean): SignModalVisibleAction;
    userSignup(args: IUserSignupArgs): UserSignupAction;
    userLogin(args: IUserLoginArgs): UserLoginAction;
  };
}
interface IOwnerState {
  username?: string;
  password?: string;
  nameValidateStatus?: 'success' | 'warning' | 'error' | 'validating';
  passwordValidateStatus?: 'success' | 'warning' | 'error' | 'validating';
}

const mapStateToProps: MapStateToProps<IStateProps, {}, IReduxState> = (state: IReduxState) => ({
  visible: state.user.signModalVisible,
  type: state.user.signModalType,
  loading: state.user.signModalLoading,
});
const mapDispatchToProps: MapDispatchToProps<IActionProps, {}> = (dispatch) => ({
  actions: bindActionCreators({ toggleSignModalVisible, userSignup, userLogin }, dispatch),
});
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const FormItem = Form.Item;
class SignModal extends Component<IStateProps & IActionProps, IOwnerState> {
  public state: IOwnerState = {
    username: '',
    password: '',
    nameValidateStatus: 'warning',
    passwordValidateStatus: 'warning',
  };
  public render() {
    const { type, visible } = this.props;
    return (
      <Modal
        title={type === SignModalType.signin ? '登录' : '注册'}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={this.renderFooter()}
      >
        {this.renderForm()}
      </Modal>
    );
  }
  private renderForm = () => {
    const { username, password, nameValidateStatus, passwordValidateStatus } = this.state;
    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label="中文名"
          validateStatus={nameValidateStatus}
          help="请输入中文名称"
        >
          <Input
            onChange={this.onNameChange}
            placeholder="unavailable choice"
            value={username}
          />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="密码"
          validateStatus={passwordValidateStatus}
          help="长度不能小于6位"
        >
          <Input
            onChange={this.onPasswordChange}
            placeholder="Warning"
            value={password}
            type="password"
          />
        </FormItem>
      </Form>
    );
  }
  private renderFooter = () => {
    const { type, loading } = this.props;
    const { nameValidateStatus, passwordValidateStatus } = this.state;
    return (
      <Fragment>
        <Button key="cancel" onClick={this.handleCancel}>取消</Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={this.handleOk}
          disabled={nameValidateStatus !== 'success' || passwordValidateStatus !== 'success'}
        >
          {type === SignModalType.signin ? '登录' : '注册'}
        </Button>
      </Fragment>
    );
  }
  private onNameChange = (ev) => {
    const nameRegExp = /^[\u4E00-\u9FA5]{1,}$/;
    const value = ev.target.value;
    const changeState: IOwnerState = { username: ev.target.value };
    if (nameRegExp.test(value)) {
      changeState.nameValidateStatus = 'success';
    } else if (value.length === 0) {
      changeState.nameValidateStatus = 'warning';
    } else {
      changeState.nameValidateStatus = 'error';
    }
    this.setState(changeState);
  }
  private onPasswordChange = (ev) => {
    const value = ev.target.value;
    const changeState: IOwnerState = { password: ev.target.value };
    if (value.length < 6) {
      changeState.passwordValidateStatus = 'warning';
    } else {
      changeState.passwordValidateStatus = 'success';
    }
    this.setState(changeState);
  }
  private handleOk = (ev) => {
    ev.preventDefault();
    const { type, actions } = this.props;
    const { username, password } = this.state;
    if (type === SignModalType.signin) {
      actions.userLogin({ username, password });
    } else {
      actions.userSignup({ username, password });
    }
  }

  private handleCancel = (ev) => {
    ev.preventDefault();
    this.props.actions.toggleSignModalVisible(false);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignModal);
