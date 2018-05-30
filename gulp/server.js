 'use strict';

 var gulp = require('gulp'), // Сообственно Gulp JS
     sync = require('browser-sync').create(); // Автообновление страницы

 var paths = require('./config'),
     wathForServer = require('./watcher').wathForServer;

 gulp.task('server', function () {
     sync.init({
         server: {
             baseDir: paths.path.dist
        }
     });
     for( let i = 0, len = wathForServer.length; i < len; i++){
         if (wathForServer[i].taskName) {
             gulp.watch(wathForServer[i].src, wathForServer[i].taskName);
         } else {
             gulp.watch(wathForServer[i].src).on('change', sync.reload);
         }
     }
 });