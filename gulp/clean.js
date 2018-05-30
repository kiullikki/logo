'use strict';

var gulp = require('gulp'),
    del = require('del');

var paths = require('./config');

gulp.task('clean', function() {
    return del(['./dist/*', 'dist']);
});