import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import App from './containers/app';
import store from './configStore';

export default (url, context) => (
  <Provider store={store}>
    <StaticRouter
      location={url}
      context={context}
    >
      <App />
    </StaticRouter>
  </Provider>
);
