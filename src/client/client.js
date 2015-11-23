import App from '../universal/App';
import ReduxibleConfig from '../libs/ReduxibleConfig';
const config = new ReduxibleConfig({
  server : true,

});

const app = new App(config);