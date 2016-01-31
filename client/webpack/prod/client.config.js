var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var $j = path.join;
var context = path.resolve(__dirname, '..', '..', '..');
var base = require('./base.config');

process.env.CLIENT = true;

var config = Object.assign({
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

config.plugins.push(
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: $j(context, 'client', 'src', 'index.html'),
    favicon: $j(context, 'client', 'src', 'favicon.ico'),
    inject: false
  }),
  new webpack.optimize.UglifyJsPlugin({
    output: {comments: false},
    sourceMap: true,
    minimize: true,
    mangle: false
  }));

module.exports = config;