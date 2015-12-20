import reduxible from '../universal/reduxible';
import config from '../../config/index';

const app = reduxible({
  server: false,
  development: config.development,
  universal: config.universal,
  devTools: config.devTools
});

app.client(window.__state, document.getElementById('content'));
