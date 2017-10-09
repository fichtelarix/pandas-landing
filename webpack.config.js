var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './js/app/main.js',
  output: {
    path: path.resolve(__dirname, 'js/build'),
    filename: 'main.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader']
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};