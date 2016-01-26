import Reduxible from 'reduxible';
import routes from './routes/index';
import middlewares from './middlewares/index';
import reducers from './services/reducers';

export default class Application extends Reduxible {
  constructor(config) {
    super({
      config,
      devTools: config.devTools ? require('./helpers/DevTools') : '',
      routes,
      middlewares,
      reducers,
      reloader: Application.reloader
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
