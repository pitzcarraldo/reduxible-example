import Reduxible from 'reduxible';
import devTools from 'reduxible-devtools';
import Html from './containers/Html';
import Error from './containers/Error/Error';
import routes from './routes';
import middlewares from './middlewares/index';
import reducers from './services/reducers';

export default class Application extends Reduxible {
  constructor(config) {
    super({
      ...config,
      container: Html,
      errorContainer: Error,
      devTools: devTools(config.development),
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
