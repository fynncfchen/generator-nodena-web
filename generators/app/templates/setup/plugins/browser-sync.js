/**
 * Plugin Setup: Browsersync
 *
 * @module setup/plugins/browser-sync
 */

/**
 * Plugin Setup: Browsersync
 *
 * @example {@lang javascript}
 * var browserSync = require('./plugins/browser-sync')(config, assets);
 *
 * @see {@link https://www.browsersync.io/|Official Site}
 * @see {@link https://www.browsersync.io/docs/options/|Avaliable Options}
 * @see {@link https://github.com/browsersync/browser-sync/|Github}
 * @param  {object} config Project configurations.
 * @param  {object} assets Project assets.
 * @return {object}        Plugins options.
 */
module.exports = function(config, assets) {
  const argv = config.argv || {};
  const pref = assets.getPreference();

  const server = pref.server || {};
  const port = argv.port || server.port;
  const isHttps = server.https;

  const options = {
    port,
    server: {
      baseDir: assets.dist,
      index: server.index,
    },
    https: isHttps,
    ui: {
      port: port + 1,
    },
    startPath: pref.root,
  };
  if (!port) {
    delete options.port;
    delete options.ui.port;
  }
  return options;
};
