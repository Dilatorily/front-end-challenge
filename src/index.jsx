import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './components/App';

const root = document.getElementById('root');
const renderComponent = Component => render(
  <AppContainer>
    <Component />
  </AppContainer>,
  root,
);

renderComponent(App);
if (__DEV__ && module.hot) {
  module.hot.accept('./components/App', () => renderComponent(App));
}
