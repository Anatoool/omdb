import { API_METHODS } from 'consts';

export const MOVIES_ACTION_TYPES = {
  MOVIES_GET_HOMEPAGE_LIST: 'MOVIES_GET_HOMEPAGE_LIST',
  MOVIES_GET_MOVIE_DETAILS: 'MOVIES_GET_MOVIE_DETAILS',
  MOVIES_CHANGE_PROCESSING: 'MOVIES_CHANGE_PROCESSING',
};

export const MOVIES_PROCESSING_KEYS = {
  HOMEPAGE_MOVIES: 'homepageMovies',
  MOVIE_DETAILS: 'movieDetails',
};

export function getHomepageMovies(query = '') {
  return async (dispatch, getState, getAxios) => {
    const axios = getAxios();

    dispatch(changeMoviesProcessingState(true, MOVIES_PROCESSING_KEYS.HOMEPAGE_MOVIES));

    const response = await axios.get(`${API_METHODS.COMMON}${query}`);

    if (!response.errorMessage) {
      dispatch({
        type: MOVIES_ACTION_TYPES.MOVIES_GET_HOMEPAGE_LIST,
        payload: response,
      });
    }

    dispatch(changeMoviesProcessingState(false, MOVIES_PROCESSING_KEYS.HOMEPAGE_MOVIES));

    return response;
  };
}

export function getMovieDetails(query = '') {
  return async (dispatch, getState, getAxios) => {
    const axios = getAxios();

    dispatch(changeMoviesProcessingState(true, MOVIES_PROCESSING_KEYS.MOVIE_DETAILS));

    const response = await axios.get(`${API_METHODS.COMMON}${query}`);

    if (!response.errorMessage) {
      dispatch({
        type: MOVIES_ACTION_TYPES.MOVIES_GET_MOVIE_DETAILS,
        payload: response,
      });
    }

    dispatch(changeMoviesProcessingState(false, MOVIES_PROCESSING_KEYS.MOVIE_DETAILS));

    return response;
  };
}

export function changeMoviesProcessingState(newState, key) {
  return {
    type: MOVIES_ACTION_TYPES.MOVIES_CHANGE_PROCESSING,
    payload: { newState, key },
  };
}
