 'use strict';

exports.wathForServer = [
    {
        taskName: ['html'],
        src: '**/*.html'
    },
    {
        taskName: null,
        src: 'dist/*.{html,css,js}'
    },
    {
        taskName: ['sass'],
        src: '**/*.scss'
    },
    {
        taskName: ['img'],
        src: 'src/img/**/*.*'
    },
    {
        taskName: ['js'],
        src: 'src/js/**/*.js'
    }
];