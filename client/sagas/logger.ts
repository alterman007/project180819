import { SagaIterator } from 'redux-saga';
import { takeEvery, fork, select } from 'redux-saga/effects';
import { IReduxState } from '../reducers';

function* Logger() {
    /* tslint:disable:no-console */
    yield takeEvery('*', function* (action): SagaIterator {
        console.groupCollapsed(`%c${action.type}`, 'color:green');
        console.log('Action:', action);
        const newState = yield select((state: IReduxState) => state);
        console.log('next state:', newState);
        console.groupEnd();
    });
}

export default fork(Logger);
