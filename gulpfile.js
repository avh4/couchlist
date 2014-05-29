var gulp = require('gulp');
var gulpFilter = require('gulp-filter');

var react = require('gulp-react');
var jasmine = require('gulp-jasmine');

var paths = {
  src: './src',
  target: './target'
};

gulp.task('test', function() {
  var testFilter = gulpFilter('test/js/**/*.js');

  gulp.src([paths.src + '/**/*.js'])
    // transform jsx to js
    .pipe(react())

    // copy into target
    .pipe(gulp.dest(paths.target))

    // run tests
    .pipe(testFilter)
    .pipe(jasmine())
    .on('error', console.warn.bind(console));
});

gulp.task('default', ['test']);
