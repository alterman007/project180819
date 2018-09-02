import { combineReducers, Reducer, compose } from 'redux';
import { handleAction } from 'redux-actions';
import {
  setUserLogin, UserLoginAction,
  setUserInfo, UserInfoAction,
  IUserInfo,
} from '../actions/user';

const initUserLogin: boolean = false;
const logged: Reducer<boolean, UserLoginAction> = handleAction<boolean, boolean>(
  setUserLogin,
  (state: boolean, action: UserLoginAction): boolean => action.payload,
  initUserLogin,
);

const initUserInfo: IUserInfo = {
  name: '',
};
const info: Reducer<IUserInfo, UserInfoAction> = handleAction<IUserInfo, IUserInfo>(
  setUserInfo,
  (state: IUserInfo, action: UserInfoAction): IUserInfo => ({ ...state, ...action.payload }),
  initUserInfo,
);

export interface IUserState {
  logged: boolean;
  info?: IUserInfo;
}

const userReducers: Reducer<IUserState> = combineReducers<IUserState>({
  logged,
  info,
});

export default userReducers;
