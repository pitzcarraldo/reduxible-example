import Express from 'express';
import serveFavicon from 'serve-favicon';
import serveStatic from 'serve-static';
import compression from 'compression';
import path from 'path';
import serverConfig from './serverConfig';
import ReduxibleConfig from '../libs/ReduxibleConfig';
import reduxible from '../universal/reduxible';

const config = new ReduxibleConfig({
  server: true,
  development: process.NODE_ENV === 'development',
  universal: true,
  devTools: false
});

const app = reduxible(config);
const server = new Express();

server.use(compression());
server.use(serveFavicon(path.join(__dirname, '..', '..', 'static', 'favicon.ico')));
server.use(serveStatic(path.join(__dirname, '..', '..', 'static')));
server.use(app.server());

var listener = server.listen(serverConfig.port, function () {
  let host = listener.address().address;
  let port = listener.address().port;
  console.log('Server listening at http://%s:%s', host, port);
});