import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { history } from 'react-router-dom';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers/index.js';

let configStore;

if ('production' === process.env.NODE_ENV) {
  configStore = initialState => {
    return createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunk, promise, routerMiddleware(history))
    );
  };
} else {
  const logger = createLogger();
  const router = routerMiddleware(history);
  const enhancer = compose(
    applyMiddleware(thunk, promise, logger, router),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );

  configStore = initialState => {
    const store = createStore(rootReducer, initialState, enhancer);

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('../reducers', () => {
        // eslint-disable-line global-require
        const nextReducer = require('../reducers').default;
        store.replaceReducer(nextReducer);
      });
    }

    return store;
  };
}

export default configStore;