var path = require('path');
var webpack = require('webpack');
var isomorphic = require('./isomorphic').plugin;
var $q = require('webpack-querify');
var babelConfig = require('./babel.config.js');
var context = path.resolve(__dirname, '..', '..');
var $j = path.join;

module.exports = {
  devtool: 'inline-source-map',
  context: context,
  entry: {
    polyfills: $j(context, 'client', 'src', 'commons', 'polyfills.js'),
    app: [
      'webpack-hot-middleware/client',
      $j(context, 'client', 'src', 'commons', 'commons.js'),
      $j(context, 'client', 'src', 'client', 'client.js')
    ]
  },
  output: {
    path: $j(context, 'src', 'main', 'webapp'),
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
        exclude: $j('client', 'src', 'app', 'views'),
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
        include: $j('client', 'src', 'app', 'views'),
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
        test: isomorphic.regular_expression('images'),
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
