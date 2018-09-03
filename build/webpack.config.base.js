const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const extractCSS = new ExtractTextWebpackPlugin('[name]-one.css');
const extractLESS = new ExtractTextWebpackPlugin('[name]-two.css');

const config = {
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          }],
        }),
      },
      {
        test: /\.less$/,
        use: extractLESS.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
              },
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    extractCSS,
    extractLESS,
  ],
};

if (isDev) {
  config.devtool = 'inline-source-map';
}

module.exports = config;
