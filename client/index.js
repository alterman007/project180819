import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app';

const $appContainer = document.querySelector('#root');

const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    $appContainer,
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./app.jsx', () => {
    render(App);
  });
}
