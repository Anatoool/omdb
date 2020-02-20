import { nodeFetch } from '../../utils/fetch';
import { API_METHODS } from '../../../src/consts';
import { stringifyQueryObject } from '../../../src/utils/api/stringifyQuery';
import { MOVIES_ACTION_TYPES } from '../../../src/store/actions/movies';

export const getHomepageDataMiddleware = (req, res, next) => {
  /* eslint-disable-next-line */
  const { store } = req;
  req.asyncRequestsBeforeSSR.push(() => getHomepageMovies(req, store));
  next();
};

const getHomepageMovies = async (req, store) => {
  const { query = {} } = req;
  const { s, page = 1, y } = query;
  if (!s) {
    return;
  }

  const url = `${API_METHODS.COMMON}${stringifyQueryObject({ s, page, y })}`;

  const response = await nodeFetch({ url });

  if (!response || response.error) {
    return;
  }

  store.dispatch({
    type: MOVIES_ACTION_TYPES.MOVIES_GET_HOMEPAGE_LIST,
    payload: response,
  });
};
