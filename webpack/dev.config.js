var webpack = require('webpack');
var $q = require('webpack-querify');
var babelConfig = require('./babel.config');
var config = require('./base.config')({
  babel: {
    loaders: [$q({ 'babel': babelConfig })]
  },
  development: true
});

module.exports = Object.assign(config, {
  devTool: 'inline-source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client',
      './src/commons/commons.js',
      './src/client.js'
    ]
  },
  plugins: [].concat(config.plugins, [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ])
});

console.log(module.exports);