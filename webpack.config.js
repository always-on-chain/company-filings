const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'react-client/dist');
const APP_DIR = path.resolve(__dirname, 'react-client/src');

const config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader'
      }
    ]
  },
  externals: {
    "jquery": "JQuery"
    //plan to use AJAX requests
  }
}

module.exports = config;