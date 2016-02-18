import 'babel-core/polyfill';
import { Application } from './app/index';
import config from './config/index';

const app = new Application({
  development: config.development,
  universal: config.universal
});


app.client(window.__state, document.getElementById('content'));
