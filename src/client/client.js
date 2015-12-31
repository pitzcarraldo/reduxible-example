import ReloadableReduxible from '../universal/ReloadableReduxible';
import config from '../../config/index';
import './pure.scss';

const reduxible = new ReloadableReduxible({
  server: false,
  development: config.development,
  universal: config.universal,
  devTools: config.devTools
});

reduxible.client(window.__state, document.getElementById('content'));
