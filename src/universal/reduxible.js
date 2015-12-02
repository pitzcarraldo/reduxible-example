import Reduxible from 'reduxible';
import Html from './views/containers/Html';
import Error from './views/containers/Error/Error';
import routes from './routes';
import middleware from './middleware/index';
import reducer from './reducer/index';

export default function reduxible(config) {
  const reloader = (store, combineReducers) => {
    if (config.isDevelopment() && module.hot) {
      module.hot.accept('./reducer/index', () => {
        const reducer = combineReducers(require('./reducer/index'));
        store.replaceReducer(reducer);
      });
    }
  };

  return new Reduxible({
    config,
    container: Html,
    errorContainer: Error,
    routes,
    middleware,
    reducer,
    reloader
  });
}
