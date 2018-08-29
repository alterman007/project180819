import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Icon, Input, Button, Checkbox } from 'antd';
import Form, { FormComponentProps } from 'antd/lib/form';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { IAuthRedirectState } from './AuthRoute';
import authAPI from '../utils/auth';
import 'antd/lib/form/style/';
import 'antd/lib/input/style/';
import 'antd/lib/button/style/';
import 'antd/lib/checkbox/style';
import './Login.less';
// import 'antd/lib/form/style/css';

interface IFieldConfig {
  option: GetFieldDecoratorOptions;
  node: React.ReactNode;
}
interface IFieldsConfig {
  [index: string]: IFieldConfig;
}

const FormItem = Form.Item;

class Login extends React.Component<FormComponentProps & RouteComponentProps<any, {}, IAuthRedirectState>, any> {
  public state = {
    name: 'alterman',
  };
  private loginFieldsOption: IFieldsConfig = {
    userName: {
      option: { rules: [{ required: true, message: 'Please input your username!' }] },
      node: (
        <Input
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Username"
        />
      ),
    },
    password: {
      option: { rules: [{ required: true, message: 'Please input your Password!' }] },
      node: (
        <Input
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="Password"
        />
      ),
    },
    remember: {
      option: { valuePropName: 'checked', initialValue: true },
      node: <Checkbox>记住我</Checkbox>,
    },
  };
  public render() {
    const locationState: IAuthRedirectState = this.props.location.state || { from: '/' };
    // console.warn(this.props.location);
    if (authAPI.isAuthenticated) {
      return <Redirect to={locationState.from} />;
    }
    return (
      <Form onSubmit={this.handleSubmit} className="login-form-container">
        <FormItem>
          {this.getFormFieldWrapper('userName')}
        </FormItem>
        <FormItem>
          {this.getFormFieldWrapper('password')}
        </FormItem>
        <FormItem>
          {this.getFormFieldWrapper('remember')}
          <a className="login-form-forgot" href="">忘记密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          <Button type="primary" htmlType="submit" className="login-form-button">
            注册
          </Button>
        </FormItem>
      </Form>
    );
  }
  private handleSubmit = (ev: React.SyntheticEvent) => {
    ev.preventDefault();
    authAPI.authenticate(() => {
      this.setState({
        name: Math.random().toString(),
      });
    });
  }
  private getFormFieldWrapper = (key: string) => {
    const { getFieldDecorator } = this.props.form;
    return getFieldDecorator(key, this.loginFieldsOption[key].option)(this.loginFieldsOption[key].node);
  }
}

export default Form.create()(Login);
