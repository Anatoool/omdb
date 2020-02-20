import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { loadableReady } from '@loadable/component';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { API_URL } from 'consts';
import * as axiosClient from 'utils/api/axiosClient';
import { configureStore } from 'store';
import Root from './containers/root';
import 'styles/index.sass';

let initialState = {};
if (window && window.REDUX_STATE) {
  initialState = window.REDUX_STATE;
  delete window.REDUX_STATE;
}
const store = configureStore(initialState);

axiosClient.init({ store, API_URL });

loadableReady(() => {
  ReactDOM.hydrate(
    <BrowserRouter>
      <Provider store={store}>
        <Root />
      </Provider>
    </BrowserRouter>,
    document.getElementById('root'),
  );
});
