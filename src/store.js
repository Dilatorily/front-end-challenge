import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';

const getEnhancer = () => {
  const baseMiddlewares = [ReduxThunk];
  const devMiddlewares = [];
  const prodMiddlewares = [];
  const middlewares = [...baseMiddlewares, ...(__DEV__ ? devMiddlewares : prodMiddlewares)];

  const baseEnhancers = [applyMiddleware(...middlewares)];
  const devEnhancers = [
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : fn => fn, // eslint-disable-line no-underscore-dangle, max-len
  ];
  const prodEnhancers = [];
  const enhancers = [...baseEnhancers, ...(__DEV__ ? devEnhancers : prodEnhancers)];

  return compose(...enhancers);
};

const configureStore = (initialState = {}) => {
  const enhancer = getEnhancer();
  const store = createStore(
    reducers,
    initialState,
    enhancer,
  );

  if (__DEV__ && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(reducers));
  }

  return store;
};

export default configureStore;
