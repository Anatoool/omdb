import { combineReducers } from 'redux';

import moviesReducer from './movies';

const reducers = {
  moviesState: moviesReducer,
};

export default combineReducers(reducers);
