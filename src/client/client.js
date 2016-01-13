import Application from '../universal/Application';
import config from '../../config/index';
import './pure.scss';

const app = new Application({
  server: false,
  development: config.development,
  universal: config.universal,
  devTools: config.devTools
});

app.client(window.__state, document.getElementById('content'));
