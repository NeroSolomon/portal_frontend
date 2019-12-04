import {
  STORE_TEST
} from './../constants/action-type.js';
import initialState from './initial-state.js';

export default function testStore(state = initialState.testStore, action) {
  const { msg } = action;
  switch (action.type) {
    case STORE_TEST:
      return Object.assign({}, state, {
        msg: msg || 'lala'
      });
    default:
      return state;
  }
}
