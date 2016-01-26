import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './../webpack/dev.config.js';
import config from '../src/config/index';

const compiler = webpack(webpackConfig);

export default function (server) {
  server.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    quiet: true,
    publicPath: webpackConfig.output.publicPath
  }));
  server.use(webpackHotMiddleware(compiler));
}