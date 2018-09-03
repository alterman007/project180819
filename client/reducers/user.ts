import { combineReducers, Reducer } from 'redux';
import { handleAction } from 'redux-actions';
import {
  setUserLoginState, UserLoginStateAction,
  setUserInfo, UserInfoAction,
  IUserInfo,
} from '../actions/user';

const initUserLogin: boolean = false;
const logged: Reducer<boolean, UserLoginStateAction> = handleAction<boolean, boolean>(
  setUserLoginState,
  (state: boolean, action: UserLoginStateAction): boolean => action.payload,
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
