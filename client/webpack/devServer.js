import Express from 'express';
import compression from 'compression';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './dev.config.js';
import config from '../src/config/index';

const server = new Express();
const compiler = webpack(webpackConfig);

server.use(compression());
server.use(Express.static(path.join('dist')));
server.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    quiet: true,
    publicPath: webpackConfig.output.publicPath
}));
server.use(webpackHotMiddleware(compiler));

var listener = server.listen(config.server.port, () => {
    var host = listener.address().address;
    var port = listener.address().port;
    console.log('Server listening at http://%s:%s', host, port);
});