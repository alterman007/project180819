import * as React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './containers/app';
import store from './configStore';
// window.store = store;
const $appContainer: HTMLElement = document.querySelector('#root') as HTMLElement;

ReactDOM.hydrate(
  <AppContainer>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
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
