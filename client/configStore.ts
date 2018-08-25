import { combineReducers, createStore, Store } from 'redux';

import rootReducer, { IReduxState } from './reducers';

const reducer = combineReducers({ ...rootReducer });

const configureStore = (preloadState) => {
  const store: Store<IReduxState> = createStore(
    reducer,
    preloadState,
  );
  return store;
};

const initState = {};
export default configureStore(initState);
