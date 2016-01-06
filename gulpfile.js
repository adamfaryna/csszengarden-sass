var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    browser: 'firefox',
    server: './app',
    port: '3000'
  });

  gulp.watch('sass/*.scss', ['sass']);
  gulp.watch('app/index.html').on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src('sass/*.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 1 version', '> 1%', 'ie 8', 'ie 7'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
