import reduxible from '../universal/reduxible';
import ReduxibleConfig from '../libs/ReduxibleConfig';
const config = new ReduxibleConfig({
  server : false,
  universal: true,
  development: false,
  useDevTools: false
});
const app = reduxible(config);

app.client(window.__state, document.getElementById('content'));