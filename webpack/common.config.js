const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const paths = require('./paths');

const { API_DOMAIN } = require('./consts');

module.exports = {
  getCommonConfig: ({ NODE_ENV }) => ({
    entry: {
      app: paths.appIndexJs,
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: paths.appAssets, to: paths.appBuild },
      ]),
      new webpack.DefinePlugin({
        'process.env': {
          IS_BROWSER: true,
          API_DOMAIN: JSON.stringify(API_DOMAIN),
          NODE_ENV: JSON.stringify(NODE_ENV),
        },
      }),
      new LoadablePlugin(),
      new ProgressBarPlugin(),
    ],

    module: {
      rules: [
        {
          test: /\.(woff2?|ttf|otf|eot)$/,
          exclude: /node_modules/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
  }),
};
