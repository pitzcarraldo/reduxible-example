import Express from 'express';
import compression from 'compression';
import path from 'path';
import api from '../api/index';

const server = new Express();

server.use(compression());
server.use(Express.static(path.join('dist')));
server.use('/api', api);

export default server;