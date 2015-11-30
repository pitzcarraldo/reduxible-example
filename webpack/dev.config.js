var path = require('path');
var webpack = require('webpack');
var babelConfig = require('./babel.config');
module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: [
    'webpack-hot-middleware/client',
    './src/client/client.js'
  ],
  output: {
    path: path.join(__dirname, '..', 'static', 'dist'),
    filename: 'app.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: babelConfig
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
};
