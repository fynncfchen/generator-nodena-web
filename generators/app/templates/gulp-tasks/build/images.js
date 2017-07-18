const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const pump = require('pump');

const _ = require('lodash');

const Setup = require('setup/setup');

module.exports = function() {
  const env = this.opts.env;
  const browserSync = this.opts.browserSync;

  const setup = new Setup(env);
  const assets = setup.assets;
  const pref = setup.getPreference();

  const src = assets.src.images;
  const dest = pref.root + assets.dest.images;

  const options = pref.imagemin;

  const plugins = _(options.plugins).map((options, key) => {
    return require('imagemin-' + _.kebabCase(key))(options);
  }).reject(_.isUndefined).value();

  return pump([
    gulp.src(src, {cwd: assets.base.src}),
    $.if(setup.isLocal, $.plumber()),
    $.if(setup.isOnline, $.imagemin(plugins, options.main)),
    gulp.dest(dest, {cwd: assets.dist}),
    browserSync.stream(),
  ]);
};
