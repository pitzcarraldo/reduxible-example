import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

export default class StoreFactory {
  constructor(options) {
    this.isDevelopment= options.config.isDevelopment();
    this.useDevTools = options.config.useDevTools();
    this.reducer = options.reducer;
    this.middleware = options.middleware;
  }

  createStore(initialState = {}) {
    let finalCreateStore;
    let appliedMiddleware = applyMiddleware(...this.middleware);

    //if (this.useDevTools) {
    //  const { devTools, persistState } = require('redux-devtools');
    //  finalCreateStore = compose(appliedMiddleware, devTools(), persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)))(createStore);
    //} else {
    //  finalCreateStore = appliedMiddleware(createStore);
    //}

    finalCreateStore = appliedMiddleware(createStore);
    const reducer = combineReducers(this.reducer);
    const store = finalCreateStore(reducer, initialState);

    //if (this.isDevelopment && module.hot) {
    //  module.hot.accept('reducers', () => {
    //    store.replaceReducer(combineReducers(require('reducers')));
    //  });
    //}

    return store;
  }
}
