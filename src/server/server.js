import 'source-map-support/register';
import Express from 'express';
import serveFavicon from 'serve-favicon';
import serveStatic from 'serve-static';
import compression from 'compression';
import path from 'path';
import { ReduxibleConfig } from 'reduxible';
import config from '../config/index';
import reduxible from '../universal/reduxible';
import Inbody from '../lib/Inbody';

const inbody = new Inbody({
  graphite: {
    prefix: '',
    host: '',
    port: ''
  },
  interval: 1000 * 30
});

const app = reduxible(new ReduxibleConfig({
  server: true,
  development: config.development,
  universal: config.universal,
  devTools: config.devTools
}));

const server = new Express();

server.use(compression());
server.use(serveFavicon(path.join(__dirname, '..', '..', 'static', 'favicon.ico')));
server.use(serveStatic(path.join(__dirname, '..', '..', 'static')));
server.use(app.server());

var listener = server.listen(config.server.port, function () {
  let host = listener.address().address;
  let port = listener.address().port;
  console.log('Server listening at http://%s:%s', host, port);
});
