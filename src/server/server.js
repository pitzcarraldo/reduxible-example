import App from '../universal/App';
import ReduxibleConfig from '../libs/ReduxibleConfig';
const config = new ReduxibleConfig({
  server: true,
  development: process.NODE_ENV === 'development',
  universal: true,
  devTools: false
});
const app = new App(config);