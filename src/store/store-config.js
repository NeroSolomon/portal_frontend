import { createStore } from 'redux';
import rootReducer from '../reducers/index.js';

const configStore = initialState => {
  return createStore(rootReducer);
};;

export default configStore;