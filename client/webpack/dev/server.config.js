var path = require('path');
var $j = path.join;
var context = path.resolve(__dirname, '..', '..', '..');
var base = require('./base.config');

process.env.CLIENT = false;

var config = Object.assign({
  entry: {
    server: $j(context, 'client', 'src', 'server', 'server.js')
  },
  output: {
    library: 'render',
    libraryTarget: 'this',
    path: $j(context, 'src', 'main', 'resources', 'static', 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/dist/'
  }
}, base);

module.exports = config;