import { MOVIES_ACTION_TYPES } from 'store/actions/movies';

const initialState = {
  homepageList: {},
  processing: {},
};

function reducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case MOVIES_ACTION_TYPES.MOVIES_GET_HOMEPAGE_LIST:
      return { ...state, homepageList: { ...payload } };
    case MOVIES_ACTION_TYPES.MOVIES_CHANGE_PROCESSING:
      return { ...state, processing: { ...state.processing, [payload.key]: payload.newState } };
    default:
      return state;
  }
}

export default reducer;
