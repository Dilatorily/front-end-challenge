import React from 'react';
import { render } from 'react-dom';
import { StyleRoot } from 'radium';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import App from './components/App';
import configureStore from './store';

const store = configureStore({});
const root = document.getElementById('root');
const renderComponent = Component => render(
  <AppContainer>
    <StyleRoot>
      <Provider store={store}>
        <Component />
      </Provider>
    </StyleRoot>
  </AppContainer>,
  root,
);

renderComponent(App);
if (__DEV__ && module.hot) {
  module.hot.accept('./components/App', () => renderComponent(App));
}
