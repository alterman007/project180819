const path = require('path');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = webpackMerge(baseConfig, {
  target: 'node',
  entry: {
    app: path.join(__dirname, '../client/server-entry.tsx'),
  },
  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
    ],
  },
});
