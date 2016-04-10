import Reduxible from 'reduxible';
import Html from './views/containers/Html';
import Error from './views/containers/Error/Error';
import routes from './routes';
import middlewares from './middlewares/index';
import reducers from './services/reducers';

export default class Application extends Reduxible {
  constructor(config) {
    super({
      ...config,
      container: Html,
      errorContainer: Error,
      devTools: config.development ? require('./views/components/DevTools/DevTools') : '',
      routes,
      middlewares,
      reducers,
      reloader(store) {
        if (module.hot) {
          module.hot.accept('./services/reducers', () => {
            store.replaceReducer(require('./services/reducers'));
          });
        }
      },
      extras: config.extras
    });
  }
}
