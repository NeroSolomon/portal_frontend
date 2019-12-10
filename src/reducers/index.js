import { combineReducers } from 'redux';
import auth from './auth.js';
import testStore from './test-store.js';
import language from './language.js';

const rootReducer = combineReducers({auth, testStore, language});

export default rootReducer;