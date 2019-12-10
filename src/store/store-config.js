import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index.js';

const configStore = initialState => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
};;

export default configStore;