import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';
import { takeLatest, fork, call, put } from 'redux-saga/effects';
import {
  setUserLoginState,
  userLogin, UserLoginAction, IUserLoginArgs,
} from '../actions/user';
// import { IReduxState } from '../reducers';

function* watchUserLogin() {
  yield takeLatest(userLogin.toString(), function* (action: UserLoginAction): SagaIterator {
    // const baseInfo = yield select((state: IReduxState) => state.user);
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
      }
    } catch (err) {
      // todo
    }
  });
}

export default fork(watchUserLogin);
