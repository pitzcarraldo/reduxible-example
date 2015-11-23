import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import HttpClient from './HttpClient';
import httpClientMiddleware from './httpClientMiddleware';
import CookieManager from './CookieManager';
import cookieMiddleware from './cookieMiddleware';

export default class StoreFactory {
  constructor(options) {
    this.isDevelopment= options.config.isDevelopment();
    this.useDevTools = options.config.useDevTools();
    this.middleware = options.middleware;
  }

  getStore(initialData = {}) {
    let finalCreateStore;
    let appliedMiddleware = applyMiddleware(...this.middleware);

    if (this.useDevTools) {
      const { devTools, persistState } = require('redux-devtools');
      finalCreateStore = compose(appliedMiddleware, devTools(), persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)))(createStore);
    } else {
      finalCreateStore = appliedMiddleware(createStore);
    }

    const reducer = combineReducers(require('reducers'));
    const store = finalCreateStore(reducer, initialData);

    if (this.isDevelopment && module.hot) {
      module.hot.accept('reducers', () => {
        store.replaceReducer(combineReducers(require('reducers')));
      });
    }

    return store;
  }
}
