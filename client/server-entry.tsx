import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/app';
import store from './configStore';

export default (
  <Provider store={store}>
    <App />
  </Provider>
);
