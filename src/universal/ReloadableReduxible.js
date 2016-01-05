import Reduxible from 'reduxible';
import Html from './views/containers/Html';
import Error from './views/containers/Error/Error';
import routes from './routes';
import middleware from './middleware/index';
import reducer from './actions/reducer';

export default class ReloadableReduxible extends Reduxible {
  constructor(config) {
    super({
      config,
      container: Html,
      errorContainer: Error,
      routes,
      middleware,
      reducer,
      reloader: ReloadableReduxible.reloader,
      extras: config.extras
    })
  }

  static reloader(store) {
    if (module.hot) {
      module.hot.accept('./actions/reducer', () => {
        store.replaceReducer(require('./actions/reducer'));
      });
    }
  };
}