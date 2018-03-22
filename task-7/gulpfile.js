var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true,
            remove: true
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
    gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('fonts', function() {
  return gulp.src('scss/fonts/**/*')
  .pipe(gulp.dest('css/fonts'))
})

// gulp.task('autoFx', function () {
//     gulp.src('./css/*.css')
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions', 'Android >= 4.0'],
//             cascade: true, //是否美化属性值 默认：true 像这样：
//             //-webkit-transform: rotate(45deg);
//             //        transform: rotate(45deg);
//             remove: true //是否去掉不必要的前缀 默认：true 
//         }))
//         .pipe(gulp.dest('./css'));
// });

gulp.task('connect', function() {
  connect.server({
      port: 8000
  });
});

gulp.task('default', ['sass','watch','fonts','connect']);