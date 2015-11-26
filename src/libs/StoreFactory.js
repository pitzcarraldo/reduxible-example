import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routeReducer }  from 'redux-simple-router';
import { persistState } from 'redux-devtools';
import DevTools from './DevTools';

export default class StoreFactory {
  constructor(options) {
    this.isDevelopment = options.config.isDevelopment();
    this.useDevTools = options.config.useDevTools();
    this.middleware = options.middleware;
    this.reducer = options.reducer;
    this.reducerPath = options.reducerPath;
  }

  createStore(initialState = {}) {
    let finalCreateStore;
    let appliedMiddleware = applyMiddleware(...this.middleware);

    if (this.useDevTools) {
      finalCreateStore = compose(
        appliedMiddleware,
        DevTools.instrument(),
        persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
      )(createStore);
    } else {
      finalCreateStore = appliedMiddleware(createStore);
    }

    const reducer = combineReducers({...this.reducer, routing: routeReducer});
    const store = finalCreateStore(reducer, initialState);
    if (this.isDevelopment && module.hot) {
      module.hot.accept(this.reducerPath, () => {
        console.log('hot');
        store.replaceReducer(combineReducers({...this.reducer, routing: routeReducer}));
      });
    }

    return store;
  }
}
