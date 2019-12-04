import { combineReducers } from 'redux';
import auth from './auth.js';
import testStore from './test-store.js';

const rootReducer = combineReducers({auth, testStore});

export default rootReducer;