var path = require('path');
var webpack = require('webpack');
var babelConfig = require('./babel.config');
var isomorphic = require('./isomorphic').plugin;
var querify = function (loader, query) {
  return loader + '?' + JSON.stringify(query);
};

module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: [
    'webpack-hot-middleware/client',
    './src/client/client.js'
  ],
  output: {
    path: path.join(__dirname, '..', 'static', 'dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          querify('babel', babelConfig),
          'eslint-loader'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(css|scss)/,
        exclude: path.join(__dirname, '..', 'src', 'universal', 'views'),
        loaders: [
          'style',
          querify('css', {
            modules: false,
            sourceMap: true
          }),
          querify('sass', {
            sourceMap: true,
            outputStyle: 'expanded'
          })
        ]
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, '..', 'src', 'universal', 'views'),
        loaders: [
          'style',
          querify('css', {
            modules: true,
            sourceMap: true,
            importLoaders: 2,
            localIdentName: '[local]___[hash:base64:5]'
          }),
          querify('sass', {
            sourceMap: true,
            outputStyle: 'expanded'
          }),
          querify('autoprefixer', {
            browsers: 'last 4 version'
          })
        ]
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    isomorphic.development()
  ]
};
