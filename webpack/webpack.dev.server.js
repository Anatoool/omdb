const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const paths = require('./paths');
const config = require('./dev.config');

const Port = 4000;
const Host = '0.0.0.0';

const options = {
  host: Host,
  hot: true,
  overlay: {
    warnings: false,
    errors: true,
  },
  quiet: false,
  noInfo: false,
  contentBase: paths.appSrc,
  historyApiFallback: true,
};

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, options);

server.listen(Port, Host, () => {});
process.stdout.write(`dev server is running: http://${Host}:${Port}\n`);
