import * as React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './containers/app';
import store from './configStore';

const $appContainer: HTMLElement = document.querySelector('#root') as HTMLElement;

ReactDOM.hydrate(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  $appContainer,
);

// const render = (Component) => {
//   ReactDOM.hydrate(
//     <AppContainer>
//       <Component />
//     </AppContainer>,
//     $appContainer,
//   )
// };

// render(App);

// if (module.hot) {
//   module.hot.accept('./container/app.tsx', () => {
//     render(App);
//   });
// }
