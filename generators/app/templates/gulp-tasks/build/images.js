const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const _ = require('lodash');

const projectSetup = require('setup/setup');

module.exports = function() {
  const env = this.opts.env;
  const browserSync = this.opts.browserSync;

  const setup = projectSetup(env);
  const assets = setup.assets;
  const pref = setup.getPreference();

  const src = assets.src.images;
  const dest = pref.root + assets.dest.images;

  const optionsImagemin = pref.imagemin;

  const plugins = _(optionsImagemin.plugins).map((options, key) => {
    return require('imagemin-' + _.kebabCase(key))(options);
  }).reject(_.isUndefined).value();

  return gulp.src(src, {cwd: assets.base.src})
    .pipe($.if(setup.isLocal, $.plumber()))
    .pipe($.if(setup.isOnline, $.imagemin(plugins, optionsImagemin.main)))
    .pipe(gulp.dest(dest, {cwd: assets.dist}))
    .pipe(browserSync.stream());
};
