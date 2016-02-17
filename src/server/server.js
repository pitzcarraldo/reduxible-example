import Express from 'express';
import cookieParser from 'cookie-parser';
import serveFavicon from 'serve-favicon';
import serveStatic from 'serve-static';
import compression from 'compression';
import path from 'path';
import config from '../config/index';
import Application from '../universal/Application';
import api from './api/index';
export default function(isomorphic) {
  const app = new Application({
    server: config.server.current,
    development: config.development,
    universal: config.universal,
    devTools: config.devTools,
    extras: { isomorphic }
  });

  const server = new Express();

  server.use(compression());
  server.use(serveFavicon(path.join(__dirname, '..', '..', 'static', 'favicon.ico')));
  server.use(serveStatic(path.join(__dirname, '..', '..', 'static')));
  server.use(cookieParser());
  server.use('/api', api);
  server.use(app.server());

  const listener = server.listen(config.server.port, () => {
    const host = listener.address().address;
    const port = listener.address().port;
    console.log('Server listening at http://%s:%s', host, port);
    if (config.development) {
      console.log('Open http://%s:%s', config.client.host, config.client.port);
    }
  });
}
