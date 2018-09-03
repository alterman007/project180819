import {
  Action,
  ActionFunction1,
  createAction,
} from 'redux-actions';
import * as actionTypes from '../constants/actionTypes';

export interface IUserInfo {
  name: string;
}

export type UserLoginStateAction = Action<boolean>;
export const setUserLoginState: ActionFunction1<boolean, UserLoginStateAction> = createAction<boolean, boolean>(
  actionTypes.setUserLoginState,
  (logged: boolean): boolean => logged,
);

export type UserInfoAction = Action<IUserInfo>;
export const setUserInfo: ActionFunction1<IUserInfo, UserInfoAction> = createAction<IUserInfo, IUserInfo>(
  actionTypes.setUserInfo,
  (logged: IUserInfo): IUserInfo => logged,
);

export interface IUserLoginArgs {
  username: string;
  password: string;
}
export type UserLoginAction = Action<IUserLoginArgs>;
export const userLogin: ActionFunction1<IUserLoginArgs, UserLoginAction> = createAction<IUserLoginArgs, IUserLoginArgs>(
  actionTypes.userLoginSubmit,
  (loginArgs: IUserLoginArgs): IUserLoginArgs => loginArgs,
);
