import { createStore, Store } from 'redux';

import rootReducer, { IReduxState } from './reducers';

const configureStore = (preloadState) => {
  const store: Store<IReduxState> = createStore(
    rootReducer,
    preloadState,
  );
  return store;
};

const initState = {};
export default configureStore(initState);
