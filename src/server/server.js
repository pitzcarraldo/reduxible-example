import 'source-map-support/register';
import Express from 'express';
import serveFavicon from 'serve-favicon';
import serveStatic from 'serve-static';
import compression from 'compression';
import path from 'path';
import { ReduxibleConfig } from 'reduxible';
import config from '../../config/index';
import reduxible from '../universal/reduxible';

export default function (isomorphic) {
  const app = reduxible({
    server: true,
    development: config.development,
    universal: config.universal,
    devTools: config.devTools,
    extras: {isomorphic}
  });

  const server = new Express();

  server.use(compression());
  server.use(serveFavicon(path.join(__dirname, '..', '..', 'static', 'favicon.ico')));
  server.use(serveStatic(path.join(__dirname, '..', '..', 'static')));
  server.use(app.server());

  const listener = server.listen(config.server.port, () => {
    let host = listener.address().address;
    let port = listener.address().port;
    console.log('Server listening at http://%s:%s', host, port);
  });
}
