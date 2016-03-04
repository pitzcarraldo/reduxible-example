var path = require('path');
var webpack = require('webpack');
var $q = require('webpack-querify');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var isomorphic = require('./isomorphic').plugin;
var context = path.resolve(__dirname, '..');

var scssLoader = (modules, development) => {
  var loader = {
    css: {
      modules: modules,
      sourceMap: true,
      importLoaders: 2
    },
    sass: {
      outputStyle: 'expanded',
      sourceMap: true
    },
    postcss: {
      syntax: 'postcss-scss'
    }
  };
  if (development) {
    loader.css.localIdentName = '[local]___[hash:base64:5]';
    return 'style!' + $q(loader);
  }
  if (!development) {
    loader.sass.sourceMapContents = true;
    return ExtractTextPlugin.extract('style', $q(loader));
  }
};

module.exports = (config) => ({
  context: context,
  output: {
    path: path.join(context, 'static', 'dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: config.babel.loaders
      },
      {
        test: /\.s?css$/,
        exclude: path.join(context, 'src', 'app'),
        loader: scssLoader(false, config.development)
      },
      {
        test: /\.s?css$/,
        include: path.join(context, 'src', 'app'),
        loader: scssLoader(true, config.development)
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: $q({
          url: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        })
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: $q({
          url: {
            limit: 10000,
            mimetype: 'application/octet-stream'
          }
        })
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: $q({
          url: {
            limit: 10000,
            mimetype: 'image/svg+xml'
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
      loader: 'es3ify'
    }]
  },
  postcss: function () {
    return [autoprefixer({ browsers: 'last 2 versions,ie <= 8' })];
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    config.development ? isomorphic.development() : isomorphic
  ]
});
