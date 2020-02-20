const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  // client paths
  appAssets: resolveApp('src/assets'), // For images and other assets
  appBuild: resolveApp('build/assets'), // Prod built files end up here
  appHtml: resolveApp('src/index.html'),
  appIndexJs: resolveApp('src/index.js'), // Main entry point
  appSrc: resolveApp('src'), // App source
  // server paths
  appBuildServer: resolveApp('build'), // Prod built server files end up here
  appServerSrc: resolveApp('server-ssr/index.js'), // Prod built server files end up here
  serverAssets: resolveApp('server-ssr/server-assets'), // Server assets
  serverBuildAssets: resolveApp('build/server-assets'), // Server assets after build
};
