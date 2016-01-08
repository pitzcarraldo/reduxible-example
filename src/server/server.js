import Express from 'express';
import cookieParser  from 'cookie-parser';
import serveFavicon from 'serve-favicon';
import serveStatic from 'serve-static';
import compression from 'compression';
import path from 'path';
import { ReduxibleConfig } from 'reduxible';
import config from '../../config/index';
import ReloadableReduxible from '../universal/ReloadableReduxible';
import api from './api/index';

export default function (isomorphic) {
  const reduxible = new ReloadableReduxible({
    server: true,
    development: config.development,
    universal: config.universal,
    devTools: config.devTools,
    extras: { isomorphic }
  });

  const app = new Express();

  app.use(compression());
  app.use(serveFavicon(path.join(__dirname, '..', '..', 'static', 'favicon.ico')));
  app.use(serveStatic(path.join(__dirname, '..', '..', 'static')));
  app.use(cookieParser());
  app.use(reduxible.server());

  const server = app.listen(config.server.port, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Server listening at http://%s:%s', host, port);
  });
}
