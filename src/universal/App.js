import Html from './views/Html';
import Routes from './views/layouts/Routes';
import Reduxible from '../libs/Reduxible';
import middleware from '../universal/middlewares'

export default class App extends Reduxible {
  constructor(config) {
    super({
      config,
      container: Html,
      routes: Routes,
      middleware: middleware
    });
  }
}