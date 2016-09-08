var gulp = require('gulp'),
    gutil = require('gulp-util')
    size = require('gulp-filesize'),
    rimraf = require('rimraf'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    es = require('event-stream'),
    header = require('gulp-header'),
    replace = require('gulp-replace'),
    _ = require('lodash'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    runSequence = require('run-sequence'),
    modRewrite = require('connect-modrewrite');


var config = require('./build/build.config.js'),
    pkg = require('./package');


var handleError = function (err) {
    gutil.log(gutil.colors.red(err.message));
    gutil.beep();
};


gulp.task('clean', function (cb) {
    rimraf(config.dist, cb);
});


gulp.task('sass', function () {
    return gulp.src(config.mainScss)
        .pipe(sass().on('error', handleError))
        .pipe(gulp.dest('app/assets/css'));
});


gulp.task('copy:assets', ['clean', 'sass'], function () {
    return es.merge(

        // copy template files
        gulp.src(['app/**/*.html'])
            .pipe(gulp.dest(config.dist)),

        // copy vendor files
        gulp.src(['app/**/*.css'])
            .pipe(gulp.dest(config.dist))

    );
});


gulp.task('optimize:html', function () {
    return gulp.src([config.html])
        .pipe(minifyHtml({
            empty: true,
            cdata: false,
            comments: false,
            conditionals: false,
            spare: false,
            quotes: true,
            loose: true
        }))
        .pipe(gulp.dest(config.dist));
});


gulp.task('optimize:css', function () {
    return gulp.src([config.base + '/assets/css/*.css'])
        .pipe(minifyCss({}))
        .pipe(gulp.dest(config.dist + '/assets/css'));
});


gulp.task('watch', ['sass'], function () {
    gulp.watch('scss/*.scss', ['sass']);
});


gulp.task('serve', ['clean', 'sass'], function () {
    browserSync({
        notify: false,
        logPrefix: pkg.name,
        server: {
            baseDir: ['app'],
            middleware: [
                modRewrite([
                    '!\\.\\w+$ /index.html [L]'
                ])
            ]
        }
    });

    gulp.watch(config.html, reload);
    gulp.watch(config.scss, ['sass', reload]);
    gulp.watch(config.js, ['jshint']);
    gulp.watch(config.assets, reload);
});


gulp.task('build', [], function (cb) {
    runSequence(['clean', 'sass', 'optimize:css', 'copy:assets', 'optimize:html'], cb);
});
