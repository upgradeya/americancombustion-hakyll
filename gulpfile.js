/*global require*/

// Load Plugins
const sass = require('gulp-sass')(require('sass'));
var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat');

// Styles
gulp.task('styles', function () {
  return gulp.src('scss/theme.scss')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});

// Styles ecommerce
gulp.task('styles-ecommerce', function () {
  return gulp.src('scss/custom/ecommerce/theme.scss')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({basename: 'ecommerce', suffix: '.min'}))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});

// Scripts
gulp.task('scripts', function () {
  return gulp.src([
      'js/bootstrap/*.js',
      'js/vendor/*.js',
      'js/custom/*.js',
      'js/theme.js'
    ])
        .pipe(sourcemaps.init())
    .pipe(concat('theme.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});

// Images
gulp.task('images', function () {
    import('gulp-imagemin').then((imagemin) => {
        gulp.src('images/*')
            .pipe(imagemin.default({ optimizationLevel: 3, progressive: true, interlaced: true }))
            .pipe(gulp.dest('dist/images'));
    });
});

// Fonts
gulp.task('fonts', function () {
  return gulp.src('fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

// Default task
gulp.task('default',
          gulp.parallel('styles', 'styles-ecommerce', 'scripts', 'fonts')
         );

// Watch
gulp.task('watch', function () {
    // Watch .scss files
    gulp.watch(['scss/**/*.scss'], gulp.parallel('styles', 'styles-ecommerce'));
    // gulp.watch(['scss/**/*.scss'], ['styles'])

    // Watch .js files
    gulp.watch('js/**/*.js', gulp.parallel('scripts'));
});
