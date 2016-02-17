import Reduxible from 'reduxible';
import Html from './views/containers/Html';
import Error from './views/containers/Error/Error';
import routes from './routes';
import middlewares from './middlewares/index';
import initialActions from './services/initialActions';
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
      initialActions,
      reducers,
      reloader,
      extras: config.extras
    });
  }
}

function reloader(store) {
  if (module.hot) {
    module.hot.accept('./services/reducers', () => {
      store.replaceReducer(require('./services/reducers'));
    });
  }
}