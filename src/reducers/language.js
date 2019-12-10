import {
  LANGUAGE_REQUEST,
  LANGUAGE_SUCCESS,
  LANGUAGE_FAILURE,
  LANGUAGE_REUSE
} from './../constants/action-type.js';
import initialState from './initial-state.js';

export default function language(state = initialState.language, action) {
  const { locale, data, error } = action;
  switch (action.type) {
    case LANGUAGE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case LANGUAGE_SUCCESS:
    case LANGUAGE_REUSE:
      return Object.assign({}, state, {
        isFetching: false,
        error: null,
        locale,
        [locale]: data
      });
    case LANGUAGE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: error || 'Error'
      });
    default:
      return state;
  }
}
