import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import auth from './auth.js';

const rootReducer = combineReducers({auth});

export default rootReducer;