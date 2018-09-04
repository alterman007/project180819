import {
  Action,
  ActionFunction1,
  ActionFunctionAny,
  BaseAction,
  createAction,
} from 'redux-actions';
import * as actionTypes from '../constants/actionTypes';

export interface IUserInfo {
  username: string;
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
  username?: string;
  password?: string;
}
export type UserLoginAction = Action<IUserLoginArgs>;
export const userLogin: ActionFunction1<IUserLoginArgs, UserLoginAction> = createAction<IUserLoginArgs, IUserLoginArgs>(
  actionTypes.userLoginSubmit,
  (loginArgs?: IUserLoginArgs): IUserLoginArgs => loginArgs || {},
);

export interface IUserSignupArgs {
  username: string;
  password: string;
}
export type UserSignupAction = Action<IUserSignupArgs>;
export const userSignup: ActionFunction1<IUserSignupArgs, UserSignupAction> =
  createAction<IUserSignupArgs, IUserSignupArgs>(
    actionTypes.userSignupSubmit,
    (loginArgs: IUserSignupArgs): IUserSignupArgs => loginArgs,
  );

export type UserLogoutAction = BaseAction;
export const userLogout: ActionFunctionAny<BaseAction> = createAction(
  actionTypes.userLogout,
);

export type SignModalVisibleAction = Action<boolean>;
export const toggleSignModalVisible: ActionFunction1<boolean, SignModalVisibleAction> = createAction<boolean, boolean>(
  actionTypes.userSignModalVisible,
  (visible: boolean): boolean => visible,
);

export enum SignModalType {
  signin,
  signup,
}
export type SignModalTypeAction = Action<SignModalType>;
export const setSignModalType: ActionFunction1<SignModalType, SignModalTypeAction> =
  createAction<SignModalType, SignModalType>(
    actionTypes.setSignModalType,
    (type: SignModalType): SignModalType => type,
  );

export type SignModalLoadingAction = Action<boolean>;
export const toggleSignModalLoading: ActionFunction1<boolean, SignModalLoadingAction> = createAction<boolean, boolean>(
  actionTypes.setSignModalSubmitLoading,
  (loading: boolean): boolean => loading,
);
