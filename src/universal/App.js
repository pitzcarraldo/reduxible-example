import Reduxible from '../libs/Reduxible';
import StoreFactory from '../libs/StoreFactory';
import Html from './Html';
import Routes from './Routes';
import middleware from './middleware/index';

export default class App extends Reduxible {
  constructor(config) {
    super({
      config,
      container: Html,
      routes: Routes,
      storeFactory: new StoreFactory({config, middleware})
    });
  }
}