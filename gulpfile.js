var gulp = require('gulp');
var gulpFilter = require('gulp-filter');
var jasmine = require('gulp-jasmine');

var paths = {
    src: './src',
    target: './target'
};

gulp.task('test', function () {
    var testFilter = gulpFilter('test/js/**/*.js');

    gulp.src([paths.src + '/**/*.js'])
        // copy into target
        .pipe(gulp.dest(paths.target))

        .pipe(testFilter)
        .pipe(jasmine())
        .on('error', console.warn.bind(console));
});

gulp.task('watch', function() {
    gulp.watch([
        paths.src + '/main/app/**/*.js',
        paths.src + '/test/**/*.js',
    ], ['test', 'js']);
});

gulp.task('default', ['test', 'watch']);