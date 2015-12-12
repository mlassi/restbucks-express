'use strict';

var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    gutil = require('gulp-util'),
    nodemon = require('gulp-nodemon');

gulp.task('mocha', function() {
    return gulp.src(['test/**/*.js'], {read:false})
        .pipe(mocha({reporter: 'list'}))
        .on('error', gutil.log);
});

gulp.task('nodemon', function() {
   nodemon({script: 'app/app.js',
            ext: 'js',
            env: {
                PORT: 8000
            },
            ignore: ['./node_modules/**']
    })
    .on('restart', function() {
        console.log('Restarting');
    });
});

gulp.task('watch-mocha', function() {
    gulp.run('mocha');
    gulp.watch(['./test/**/*.js', 'app/**/*.js'], ['mocha']);
});

gulp.task('default', ['watch-mocha']);
