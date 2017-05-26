var less = require('gulp-less');

var paths = {
  lessFiles: ['public/css/*.less'],
  css:'public/css'
};

gulp.task('less', function () {
  return gulp.src(paths.lessFiles)
  .pipe(less(
    [path.join(__dirname,'less','')]
  ))
});


gulp.task('watch', function () {
  gulp.watch(paths.lessFiles, ['less']);
});