var path = require('path');
var $j = path.join;
var context = path.resolve(__dirname, '..', '..');
var base = require('./prod.base.config');

process.env.CLIENT = true;

module.exports = Object.assign({
  entry: {
    polyfills: $j(context, 'client', 'src', 'commons', 'polyfills.js'),
    app: [
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
