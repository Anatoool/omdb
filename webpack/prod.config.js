const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const paths = require('./paths');
const { getCommonConfig } = require('./common.config.js');
const { API_DOMAIN } = require('./consts');

const prodConfig = {
  mode: 'production',

  output: {
    filename: '[name]-[chunkhash:8].js',
    path: paths.appBuild,
    publicPath: './assets/',
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      filename: 'ssr-index.html',
      excludeChunks: ['app'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        useShortDoctype: true,
      },
      apiDomainUrl: API_DOMAIN,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    // new BundleAnalyzerPlugin(),
  ],

  optimization: {
    minimizer: [
      new TerserPlugin({ test: /\.js(\?.*)?$/i }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(paths.appSrc),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              // you can use variables in all sass|scss files without importing
              resources: ['./src/styles/variables.sass'],
            },
          },
        ],
      },
    ],
  },
};

module.exports = merge(getCommonConfig({ NODE_ENV: 'production' }), prodConfig);
