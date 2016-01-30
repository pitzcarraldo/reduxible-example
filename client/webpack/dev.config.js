var path = require('path');
var $j = path.join;
var context = path.resolve(__dirname, '..', '..');
var base = require('./dev.base.config');

process.env.CLIENT = true;

module.exports = module.exports = Object.assign({
  entry: {
    polyfills: $j(context, 'client', 'src', 'commons', 'polyfills.js'),
    app: [
      'webpack-hot-middleware/client',
      $j(context, 'client', 'src', 'commons', 'commons.js'),
      $j(context, 'client', 'src', 'client', 'client.js')
    ]
  },
  output: {
    path: $j(context, 'src', 'main', 'resources', 'static', 'dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/'
  }
}, base);
