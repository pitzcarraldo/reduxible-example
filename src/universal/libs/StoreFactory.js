import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import HttpClient from './HttpClient';
import httpClientMiddleware from './httpClientMiddleware';
import CookieManager from './CookieManager';
import cookieMiddleware from './cookieMiddleware';

export default class HttpClientStoreFactory {
  constructor(props) {
    this.isServer = props.isServer;
    this.isDevelopment = props.isDevelopment;
    this.useDevTools = props.useDevTools;
    this.host = props.host;
  }

  getStore(req, data) {
    const httpClient = new HttpClient(this.host, req, this.isServer);
    const http = httpClientMiddleware(httpClient);
    const cookieManager = new CookieManager(req);
    const cookie = cookieMiddleware(cookieManager);
    let finalCreateStore;
    if (this.useDevTools) {
      const { devTools, persistState } = require('redux-devtools');
      finalCreateStore = compose(
        applyMiddleware(http, cookie),
        devTools(),
        persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
      )(createStore);
    } else {
      finalCreateStore = applyMiddleware(http, cookie)(createStore);
    }

    const reducer = combineReducers(require('reducers'));
    const store = finalCreateStore(reducer, data);
    store.httpClient = httpClient;
    if (this.isDevelopment && module.hot) {
      module.hot.accept('reducers', () => {
        store.replaceReducer(combineReducers(require('reducers')));
      });
    }

    return store;
  }
}
