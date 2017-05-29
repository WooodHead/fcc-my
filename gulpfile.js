var gulp = require('gulp');
var less = require('gulp-less');
var sync = require('browser-sync');
var reloadDelay = 1000;
var nodemon = require('gulp-nodemon');


var paths = {
    lessFiles: './public/css/*.less',
    css: './public/css/',
    server: './bin/www'
};

gulp.task('serve', function (cb) {

    var started = false;

    return nodemon({
        script: 'app.js'
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
});


gulp.task('sync', ['serve'], function () {
    sync.init(null, {
        script: paths.server,
        proxy: "http://localhost:4000",
        files: ["public/**/*.*", "views/**/*.*"],
        // browser: "google chrome",
        // open: true,
        online: true,
        port: 4001,
    });
});

gulp.task('default', ['serve', 'sync']);
