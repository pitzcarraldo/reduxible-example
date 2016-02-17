import Reduxible from 'reduxible';
import Html from './views/containers/Html';
import Error from './views/containers/Error/Error';
import routes from './routes/index';
import middlewares from './middlewares/index';
import reducers from './services/reducers';
import initialActions from './services/initialActions';

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
      reloader: Application.reloader,
      initialActions,
      extras: config.extras
    });
  }

  static reloader(store) {
    if (module.hot) {
      module.hot.accept('./services/reducers', () => {
        store.replaceReducer(require('./services/reducers'));
      });
    }
  }
}
