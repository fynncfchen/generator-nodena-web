const gulp = require('gulp');

const projectSetup = require('setup/setup');

module.exports = function() {
  const env = this.opts.env;

  const setup = projectSetup(env);
  const assets = setup.assets;
  const pref = setup.getPreference();

  const src = pref.root + assets.src.images;
  const dest = assets.dest.images;

  return gulp
    .src(src, {cwd: assets.dist})
    .pipe(gulp.dest(dest, {cwd: assets.base.src}));
};
