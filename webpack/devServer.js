import Express from 'express';
import proxy from 'express-http-proxy';
import url from 'url';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './dev.config';
import config from '../config/index';

const compiler = webpack(webpackConfig);
const server = new Express();

server.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  quiet: true,
  publicPath: webpackConfig.output.publicPath
}));
server.use(webpackHotMiddleware(compiler));
server.use(proxy(`${config.server.host}:${config.server.port}`, {
  forwardPath: function (req) {
    return url.parse(req.url).path;
  }
}));

var listener = server.listen(config.client.port, function () {
  let host = listener.address().address;
  let port = listener.address().port;
  console.log('Webpack Dev Server listening at http://%s:%s', host, port);
});
