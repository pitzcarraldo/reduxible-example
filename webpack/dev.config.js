var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var $q = require('webpack-querify');
var babelConfig = require('./babel.config');

module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    polyfills: './src/commons/polyfills.js',
    app: [
      'webpack-hot-middleware/client',
      './src/commons/commons.js',
      './src/index.js'
    ]
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[hash].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [$q({'babel': babelConfig})]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(css|scss)/,
        exclude: path.join(__dirname, '..', 'src', 'app', 'views'),
        loader: $q({
          style: {},
          css: {
            modules: false,
            sourceMap: true
          },
          sass: {
            sourceMap: true,
            outputStyle: 'expanded'
          },
          autoprefixer: {
            browsers: 'last 2 versions,ie <= 8'
          }
        })
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, '..', 'src', 'app', 'views'),
        loader: $q({
          style: {},
          css: {
            modules: true,
            sourceMap: true,
            importLoaders: 2,
            localIdentName: '[local]___[hash:base64:5]'
          },
          sass: {
            sourceMap: true,
            outputStyle: 'expanded'
          },
          autoprefixer: {
            browsers: 'last 2 versions,ie <= 8'
          }
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader',
        query: {
          limit: 10240
        }
      }
    ],
    postLoaders: [{
      test: /\.js$/,
      loaders: ['es3ify']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      favicon: 'src/favicon.ico',
      inject: false
    }),
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
