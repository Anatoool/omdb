import { stringify } from 'qs';
import { OMDB_API_KEY } from 'consts';

export const stringifyQueryObject = (queryObj = {}, options = {}) => stringify(
  {
    apiKey: OMDB_API_KEY,
    ...queryObj,
  },
  {
    addQueryPrefix: true,
    ...options,
  },
);
