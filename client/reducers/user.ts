import { combineReducers, Reducer } from 'redux';
import { handleAction } from 'redux-actions';
import {
  setUserLoginState, UserLoginStateAction,
  setUserInfo, UserInfoAction,
  toggleSignModalVisible, SignModalVisibleAction,
  setSignModalType, SignModalTypeAction, SignModalType,
  toggleSignModalLoading, SignModalLoadingAction,
  IUserInfo,
} from '../actions/user';

const initUserLogin: boolean = false;
const logged: Reducer<boolean, UserLoginStateAction> = handleAction<boolean, boolean>(
  setUserLoginState,
  (state: boolean, action: UserLoginStateAction): boolean => action.payload,
  initUserLogin,
);

const initUserInfo: IUserInfo = {
  username: '曹东旭',
};
const info: Reducer<IUserInfo, UserInfoAction> = handleAction<IUserInfo, IUserInfo>(
  setUserInfo,
  (state: IUserInfo, action: UserInfoAction): IUserInfo => ({ ...state, ...action.payload }),
  initUserInfo,
);

const initSignModalVisible: boolean = false;
const signModalVisible: Reducer<boolean, SignModalVisibleAction> = handleAction<boolean, boolean>(
  toggleSignModalVisible,
  (state: boolean, action: SignModalVisibleAction): boolean => action.payload,
  initSignModalVisible,
);

const initSignModalType: SignModalType = SignModalType.signin;
const signModalType: Reducer<SignModalType, SignModalTypeAction> = handleAction<SignModalType, SignModalType>(
  setSignModalType,
  (state: SignModalType, action: SignModalTypeAction): SignModalType => action.payload,
  initSignModalType,
);

const initSignModal: boolean = false;
const signModalLoading: Reducer<boolean, SignModalLoadingAction> = handleAction<boolean, boolean>(
  toggleSignModalLoading,
  (state: boolean, action: SignModalVisibleAction): boolean => action.payload,
  initSignModal,
);

export interface IUserState {
  logged: boolean;
  info: IUserInfo;
  signModalVisible: boolean;
  signModalType: SignModalType;
  signModalLoading: boolean;
}

const userReducers: Reducer<IUserState> = combineReducers<IUserState>({
  logged,
  info,
  signModalVisible,
  signModalType,
  signModalLoading,
});

export default userReducers;
