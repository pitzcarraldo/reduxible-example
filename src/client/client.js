import reduxible from '../universal/reduxible';
import { ReduxibleConfig } from 'reduxible';
import config from '../../config/index';

const app = reduxible(new ReduxibleConfig({
  server: false,
  development: config.development,
  universal: config.universal,
  devTools: config.devTools
}));

app.client(window.__state, document.getElementById('content'));
