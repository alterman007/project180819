import {
  Action,
  ActionFunction1,
  createAction,
} from 'redux-actions';
import * as actionTypes from '../constants/actionTypes';

export interface IUserInfo {
  name: string;
}

export type UserLoginAction = Action<boolean>;
export const setUserLogin: ActionFunction1<boolean, UserLoginAction> = createAction<boolean, boolean>(
  actionTypes.userLogin,
  (logged: boolean): boolean => logged,
);

export type UserInfoAction = Action<IUserInfo>;
export const setUserInfo: ActionFunction1<IUserInfo, UserInfoAction> = createAction<IUserInfo, IUserInfo>(
  actionTypes.userLogin,
  (logged: IUserInfo): IUserInfo => logged,
);
