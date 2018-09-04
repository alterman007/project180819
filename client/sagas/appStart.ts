import { SagaIterator } from 'redux-saga';
import axios, { AxiosResponse } from 'axios';
import { takeLatest, fork, call, put } from 'redux-saga/effects';
import {
  appStart, IAppStart,
} from '../actions/';
import {
  setUserLoginState,
  setUserInfo,
} from '../actions/user';

function* watchAppStart() {
  yield takeLatest(appStart.toString(), function* (action: IAppStart): SagaIterator {
    const { data: logState }: AxiosResponse<any> = yield call<string>(axios, '/user/record');
    if (logState.success) {
      yield put(setUserLoginState(true));
      yield put(setUserInfo({ username: logState.message.username }));
    }
  });
}

export default fork(watchAppStart);
