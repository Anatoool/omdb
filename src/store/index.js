import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { getAxios } from 'utils/api/axiosClient';
import rootReducer from './reducers/root';

export function configureStore(initialState = {}) {
  const middlewares = [
    thunk.withExtraArgument(getAxios),
  ];

  let composeEnhancers = compose;
  if (
    process.env.NODE_ENV === 'development'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // eslint-disable-line
  ) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // eslint-disable-line
  }

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers/root', () => {
      const nextReducer = require('./reducers/root').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
