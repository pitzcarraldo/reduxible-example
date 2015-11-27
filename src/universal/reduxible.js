import Reduxible from 'reduxible';
import Html from './views/containers/Html';
import Error from './views/containers/Error/Error';
import routes from './routes';
import middleware from './middleware/index';
import reducer from './reducer/index';

const reload = (isDevelopment, store, combineReducers) => {
  if (isDevelopment && module.hot) {
    module.hot.accept('./reducer/index', () => {
      const reducer = combineReducers(require('./reducer/index'));
      store.replaceReducer(reducer);
    });
  }
};

export default function reduxible(config) {
  return new Reduxible({
    config,
    container: Html,
    errorContainer: Error,
    routes,
    middleware,
    reducer,
    reload
  });
}
