import '../node_modules/babel-core/polyfill';
import Application from './app/Application';
import config from './config/index';

const app = new Application({
  server: false,
  universal: false,
  hashHistory: true,
  development: config.development,
  devTools: config.devTools
});

app.client(window.__state, document.getElementById('content'));
