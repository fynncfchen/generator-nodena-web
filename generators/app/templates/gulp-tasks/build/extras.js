const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const through = require('through2');

const _ = require('lodash');

const setup = require('setup/setup');

function noop() {
  return through.obj();
}

module.exports = function() {
  const browserSync = this.context.browserSync;

  const assets = setup.assets;
  const preprocessOpts = setup.plugins.gulpPreprocess;

  const extrasData = (setup.globals || {}).extras;
  const isPreprocess = !_.isEmpty(extrasData);
  const filterOpts = preprocessOpts.filter.extras;
  const $filter = filterOpts ? $.filter(filterOpts, {restore: true}) : noop();
  const $filterRestore = filterOpts ? $filter.restore : noop();

  const src = assets.src.extras;
  const dest = setup.root;

  preprocessOpts.context = _.merge(preprocessOpts.context, extrasData);

  return gulp.src(src, {cwd: assets.base.src})
    .pipe($.if(isPreprocess, $filter))
    .pipe($.if(isPreprocess, $.preprocess(preprocessOpts)))
    .pipe($.if(isPreprocess, $filterRestore))
    .pipe(gulp.dest(dest, {cwd: assets.build}))
    .pipe(browserSync.stream());
};
