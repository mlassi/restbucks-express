'use strict';

var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    gutil = require('gulp-util');

gulp.task('mocha', function() {
    return gulp.src(['app/**/*.js'], {read:false})
        .pipe(mocha({reporter: 'list'}))
        .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
    gulp.run('mocha');
    gulp.watch(['./tests/**/*.js', 'app/**/*.js'], ['mocha']);
});

gulp.task('default', ['watch-mocha']);
