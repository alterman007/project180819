import { applyMiddleware, createStore, Store, Middleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { IReduxState } from './reducers';
import rootSagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const configureStore = (preloadState) => {
  const reduxMiddlewareArr: Middleware[] = [sagaMiddleware];
  const store: Store<IReduxState> = createStore(
    rootReducer,
    preloadState,
    applyMiddleware(...reduxMiddlewareArr),
  );
  sagaMiddleware.run(rootSagas);
  return store;
};

const initState = {};
export default configureStore(initState);
