var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');
// var svgSprite = require('gulp-svg-sprite');
// var svgSprites = require('gulp-svg-sprites');
var connect = require('gulp-connect');

gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true,
            remove: true
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('watch', function () {
    gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('fonts', function () {
    return gulp.src('scss/fonts/**/*')
        .pipe(gulp.dest('css/fonts'))
})

gulp.task('sprite', function () {
  var spriteData = gulp.src('sprite-images/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  return spriteData.pipe(gulp.dest('images'));
});

// gulp.task('svgSprite', function () {
// 	return gulp.src('icon-images/*.svg')
// 		.pipe(svgSprite({
// 			// shape: {
// 			// 	spacing: {
// 			// 		padding: 5
// 			// 	}
// 			// },
// 			mode: {
// 				view: {
// 					bust: false,
// 					render: {
// 						scss: true
// 					}
// 				},
//                 symbol: true
// 			},
// 		}))
// 		.pipe(gulp.dest('images'));
// });

// gulp.task('svgSprites', function () {
//     return gulp.src('icon-images/*.svg')
//         .pipe(svgSprites())
//         .pipe(gulp.dest("out"));
// });
gulp.task('connect', function() {
  connect.server({
      port: 8000
  });
});

gulp.task('default', ['sass', 'watch', 'fonts', 'connect']);