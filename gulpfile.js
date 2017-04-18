var gulp          = require('gulp'),
    cssnano       = require('gulp-cssnano'),
    rupture       = require('rupture'),
    koutoSwiss    = require('kouto-swiss'),
    autoprefixer  = require('autoprefixer-stylus'),
    stylus        = require('gulp-stylus'),
    jeet          = require('jeet'),
    uglify        = require('gulp-uglify'),
    imagemin      = require('gulp-imagemin'),
    browserSync   = require('browser-sync').create()
    htmlmin       = require('gulp-htmlmin');

const DIST_PATH = 'public/';

gulp.task('css', ['stylus'], function () {
  return gulp.src([
      'assets/css/style.css'
    ])
    .pipe(cssnano())
    .pipe(gulp.dest('public/assets/css/'));
});

gulp.task('js', function () {
  return gulp.src([
      'assets/script/main.js'
    ])
    .pipe(uglify())
    .pipe(gulp.dest('public/assets/script/'));
});

gulp.task('image', function () {
  return gulp.src([
      'assets/image/**'
    ])
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest('public/assets/image/'));
});

gulp.task('html', function () {
  return gulp.src('index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('public/'));
});


gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('assets/styl/**/*.styl', ['stylus']).on('change', browserSync.reload);
    gulp.watch("index.html").on('change', browserSync.reload);
});

gulp.task('stylus', function () {
  var config = {
    use: [jeet(), rupture(), koutoSwiss(), autoprefixer()]
  };
  return gulp.src('assets/styl/style.styl')
    .pipe(stylus(config))
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', ['stylus'], function () {
});

gulp.task('build', ['css', 'js', 'image', 'html']);
gulp.task('default', ['stylus', 'serve']);
