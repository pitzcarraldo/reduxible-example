var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./base.config')({
  babel: {
    loaders: ["strip?strip[]=debug", 'babel']
  },
  development: false
});

module.exports = Object.assign(config, {
  devtool: 'source-map',
  entry: {
    app: [
      './src/commons/commons.js',
      './src/client.js'
    ]
  },
  plugins: [].concat(config.plugins, [
    new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: false,
      minimize: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
        HOST: JSON.stringify(process.env.HOST),
        GA_TRACKING_ID: JSON.stringify(process.env.GA_TRACKING_ID),
        PORT: process.env.PORT,
        CLIENT: true
      }
    })
  ])
});