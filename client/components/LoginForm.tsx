import React from 'react';
import { Icon, Input, Button, Checkbox } from 'antd';
import Form, { FormComponentProps } from 'antd/lib/form';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { IUserLoginArgs } from '../actions/user';
import 'antd/lib/form/style/';
import 'antd/lib/input/style/';
import 'antd/lib/button/style/';
import 'antd/lib/checkbox/style';
import './LoginForm.less';

interface IOwnerProps {
  onFormSubmit(props: IUserLoginArgs): void;
}
interface IFieldConfig {
  option: GetFieldDecoratorOptions;
  node: React.ReactNode;
}
interface IFieldsConfig {
  [index: string]: IFieldConfig;
}

const FormItem = Form.Item;
class LoginForm extends React.Component<IOwnerProps & FormComponentProps> {
  private loginFieldsOption: IFieldsConfig = {
    username: {
      option: { rules: [{ required: true, message: 'Please input your username!' }] },
      node: (
        <Input
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="用户名"
        />
      ),
    },
    password: {
      option: { rules: [{ required: true, message: 'Please input your Password!' }] },
      node: (
        <Input
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="密码"
        />
      ),
    },
    remember: {
      option: { valuePropName: 'checked', initialValue: true },
      node: <Checkbox>记住我</Checkbox>,
    },
  };
  public render() {
    return (
      <Form onSubmit={this.handleSubmit} className="login-form-container">
        <FormItem>
          {this.getFormFieldWrapper('username')}
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
    const { form, onFormSubmit } = this.props;
    // console.log(form.getFieldsValue());
    const value: IUserLoginArgs = form.getFieldsValue() as IUserLoginArgs;
    // actions.userLogin(value);
    onFormSubmit(value);
  }
  private getFormFieldWrapper = (key: string) => {
    const { getFieldDecorator } = this.props.form;
    return getFieldDecorator(key, this.loginFieldsOption[key].option)(this.loginFieldsOption[key].node);
  }
}

export default Form.create()(LoginForm);
