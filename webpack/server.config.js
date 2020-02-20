const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpackNodeExternals = require('webpack-node-externals');

const { API_DOMAIN } = require('./consts');
const paths = require('./paths');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: paths.appServerSrc,
  output: {
    path: paths.appBuildServer,
    filename: 'server.js',
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        API_DOMAIN: JSON.stringify(API_DOMAIN),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [['dynamic-import-node']],
          },
        },
      },
      {
        test: /\.(sass|css|scss|svg)$/,
        use: 'ignore-loader',
      },
    ],
  },
  externals: [webpackNodeExternals()],
};
