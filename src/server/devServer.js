import webpack from 'webpack';
import webpackConfig from '../../webpack/dev.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const compiler = webpack(webpackConfig);

export default function devServer(server) {
  server.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}));
  server.use(webpackHotMiddleware(compiler));
}
