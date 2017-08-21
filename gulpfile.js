const gulp  = require('gulp')
const changed = require('gulp-changed')
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-clean-css');
const del = require('del')

const imgSrc = './src/img/**/*'
const imgDest = './public/img'

const jsSrc = './src/js/**/*'
const jsDest = './public/js'
const JS_DIST = 'main.min.js';

const cssSrc = './src/css/**/*'
const cssDest = './public/css'
const CSS_DIST = 'main.min.css';


gulp.task('scripts', function() {
  gulp.src(jsSrc)
    .pipe(concat(JS_DIST))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest(jsDest));
});

gulp.task('styles', function() {
  gulp.src(cssSrc)
    .pipe(concat(CSS_DIST))
    .pipe(minifyCSS())
    .pipe(gulp.dest(cssDest));
});

gulp.task('imagemin', function() {
   gulp.src(imgSrc)
    .pipe(changed(imgDest))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDest));
  });

// gulp.task('clean-js', function() {
//   del('./public/js/**/*').then(paths => {
//     paths.length && console.log('Removed:\n', paths.join('\n'));
//   });
// });

// gulp.task('clean-css', function() {
//   del('./public/css/**/*').then(paths => {
//     paths.length && console.log('Removed:\n', paths.join('\n'));
//   });
// });

// gulp.task('build', ['imagemin', 'clean-css', 'styles', 'clean-js', 'scripts'], function() {
// });

gulp.task('build', ['imagemin', 'styles', 'scripts'], function() {
});

gulp.task('clean:build', function() {
   return del.sync('build');
})

gulp.task('deploy', ['clean:build'])
