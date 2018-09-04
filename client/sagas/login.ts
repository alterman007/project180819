import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';
import { takeLatest, fork, call, put, all } from 'redux-saga/effects';
import message from '../utils/toast';
import {
  setUserLoginState,
  userLogin, UserLoginAction, IUserLoginArgs,
  userSignup, UserSignupAction, IUserSignupArgs,
  userLogout, UserLogoutAction,
  setUserInfo,
  toggleSignModalLoading,
  toggleSignModalVisible,
} from '../actions/user';

function* watchUserLogin() {
  yield takeLatest(userLogin.toString(), function* (action: UserLoginAction): SagaIterator {
    yield put(toggleSignModalLoading(true));
    const userLoginInfo: IUserLoginArgs = action.payload;
    try {
      const logRes: AxiosResponse<any> = yield call<AxiosRequestConfig>(
        axios,
        {
          url: '/user/signin',
          headers: {
            'content-type': 'application/json',
          },
          method: 'POST',
          data: userLoginInfo,
        },
      );
      const logResponse = logRes.data;
      if (logResponse.success) {
        yield put(setUserLoginState(true));
        yield put(setUserInfo({ username: logResponse.message.username }));
        yield put(toggleSignModalVisible(false));
      } else {
        message.error(logResponse.message);
        yield put(toggleSignModalLoading(false));
      }
    } catch (err) {
      // todo
    } finally {
      yield put(toggleSignModalLoading(false));
    }
  });
}
function* watchUserSignup() {
  yield takeLatest(userSignup.toString(), function* (action: UserSignupAction): SagaIterator {
    yield put(toggleSignModalLoading(true));
    const userLoginInfo: IUserSignupArgs = action.payload;
    try {
      const logRes: AxiosResponse<any> = yield call<AxiosRequestConfig>(
        axios,
        {
          url: '/user/signup',
          headers: {
            'content-type': 'application/json',
          },
          method: 'POST',
          data: userLoginInfo,
        },
      );
      const logResponse = logRes.data;
      // console.log({logResponse});
      if (logResponse.success) {
        yield put(setUserLoginState(true));
        yield put(setUserInfo({ username: logResponse.message.username }));
        yield put(toggleSignModalVisible(false));
      } else {
        message.error(logResponse.message);
        yield put(toggleSignModalLoading(false));
      }
    } catch (err) {
      // todo
      // console.error(err);

    } finally {
      yield put(toggleSignModalLoading(false));
    }
  });
}
function* watchUserLogout() {
  yield takeLatest(userLogout.toString(), function* (action: UserLogoutAction): SagaIterator {
    try {
      const logRes: AxiosResponse<any> = yield call<string>(axios, '/user/logout');
      const logResponse = logRes.data;
      if (logResponse.success) {
        yield put(setUserLoginState(false));
      }
    } catch (err) {
      // todo
    }
  });
}

export default all([
  fork(watchUserLogin),
  fork(watchUserSignup),
  fork(watchUserLogout),
]);
