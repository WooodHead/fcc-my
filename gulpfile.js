var gulp = require('gulp'),
    debug = require('debug')('freecc:gulp'),
    bower = require('bower-main-files'),
    nodemon = require('gulp-nodemon'),
    sync = require('browser-sync'),
    reload = sync.reload,
    inject = require('gulp-inject'),
    reloadDelay = 1000,
    eslint = require('gulp-eslint');

const bourbon = require("bourbon");
const neat = require("bourbon-neat");

var sass = require('gulp-sass');


var paths = {
    server: './app.js',
    serverIgnore: []
};

gulp.task('inject', function () {
    gulp.src('views/home.jade')
        .pipe(inject(gulp.src(bower()), {
            //ignorePath: '/public'
        }))
        .pipe(gulp.dest('views'));
});

gulp.task('serve', function (cb) {
    var called = false;
    nodemon({
        script: paths.server,
        ext: '.js',
        ignore: paths.serverIgnore,
        env: {
            'NODE_ENV': 'development',
            'DEBUG': 'freecc:*'
        }
    })
        .on('start', function () {
            if (!called) {
                called = true;
                setTimeout(function () {
                    cb();
                }, reloadDelay);
            }
        })
        .on('restart', function (files) {
            if (files) {
                debug('Files that changes: ', files);
            }
            setTimeout(function () {
                debug('Restarting browsers');
                reload();
            }, reloadDelay);
        });
});

gulp.task('sync', ['serve'], function () {
    sync.init(null, {
        proxy: 'http://localhost:4000',
        logLeval: 'debug',
        //   files: ['public/js/lib/*/*.{js, jsx}'],
        files: ["public/**/*.*", "views/**/*.*"],
        online: true,
        port: 4001,
        open: false,
        reloadDelay: reloadDelay
    });
});

gulp.task('lint', function () {
    return gulp.src(['public/js/lib/**/*'])
        .pipe(eslint())
        .pipe(eslint.format());
});

var gulp = require("gulp");
var browserify = require("browserify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");

gulp.task("bundle", function () {
    return browserify({
        entries: "./app/main.jsx",
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest("public"))
});

gulp.task("SchoolFinder", function () {
    return browserify({
        entries: "./app/SchoolFinder.jsx",
        // extensions:"jsx",
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source("SchoolFinder.js"))
        .pipe(gulp.dest("public"))
});

gulp.task("copy", ["bundle"], function () {
    return gulp.src(["app/lib/bootstrap-css/css/bootstrap.min.css", "app/style.css"])
        .pipe(gulp.dest("public"));
});

// gulp.task("scss", function () {
//     gulp.src(
//         "client/sass/*.scss"
//     ).pipe(scss(
//         { "bundleExec": false }
//     )).pipe(gulp.dest("public/screen.css"));
// });

// gulp.task('scss', function () {
//     gulp.src(
//         "client/sass/*.scss")
//         .pipe(sass({
//             includePaths:
//             //  ['client/sass']
//             [neat.includePaths,
//             bourbon.includePaths]
//         }).on('error', sass.logError))
//         .pipe(gulp.dest('public/screen.css'));
// });

gulp.task('watch', function () {
    gulp.watch('app/main.jsx', ['bundle']);
    gulp.watch('app/**/*.jsx', ['SchoolFinder']);
    // gulp.watch('app/sass/*.scss', ['scss']);
});


gulp.task('default', ['serve', 'sync', 'copy', 'SchoolFinder','watch']);
