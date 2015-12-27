var path = require('path');
var webpack = require('webpack');
var babelConfig = require('./babel.config');
var strip = require('strip-loader');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var isomorphic = require('./isomorphic').plugin;
var querify = require('./querify');

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    client: './src/client/client.js'
  },
  output: {
    path: path.join(__dirname, '..', 'static', 'dist'),
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          strip.loader('debug'),
          querify({'babel': babelConfig})
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(css|scss)/,
        exclude: path.join(__dirname, '..', 'src', 'universal', 'views'),
        loader: ExtractTextPlugin.extract(
          'style',
          querify({
            'css': {
              sourceMap: true
            },
            'sass': {
              sourceMap: true,
              outputStyle: 'expanded'
            }
          })
        )
      },
      {
        test: /\.(css|scss)/,
        include: path.join(__dirname, '..', 'src', 'universal', 'views'),
        loader: ExtractTextPlugin.extract(
          'style',
          querify({
            'css': {
              modules: true,
              importLoaders: 2,
              sourceMap: true
            },
            'sass': {
              outputStyle: 'expanded',
              sourceMap: true,
              sourceMapContents: true
            },
            'autoprefixer': {
              browsers: 'last 4 version'
            }
          })
        )
      },
      {
        test: isomorphic.regular_expression('images'),
        loader: 'url-loader',
        query: {
          limit: 10240
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    isomorphic
  ]
};
