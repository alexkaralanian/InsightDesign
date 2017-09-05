const gulp  = require('gulp')
const changed = require('gulp-changed')
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-clean-css');
const del = require('del');
// const browserSync = require('browser-sync').create();

const imgSrc = './src/img/**/*'
const imgDest = './public/img'
const jsDest = './public/js'
const cssDest = './public/css'
const fontDest = './public/fonts'

// SCRIPTS
gulp.task('userScripts', function() {
  gulp.src(['./src/js/custom.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest(jsDest));
});

gulp.task('scripts', function() {
  gulp.src(['./src/js/jquery.min.js', './src/js/jquery.magnific-popup.min.js', './src/js/bootstrap.min.js', './src/js/wow.min.js', './src/js/owl.carousel.min.js'])
    .pipe(gulp.dest(jsDest));
});

// STYLES
gulp.task('userStyles', function() {
  gulp.src(['./src/css/styles.css'])
    .pipe(concat('main.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(cssDest));
});

gulp.task('styles', function() {
  gulp.src(['./src/css/font_awesome/css/font-awesome.min.css', './src/css/bootstrap.min.css', './src/css/owl.carousel.min.css', './src/css/owl.theme.default.min.css'])
    .pipe(gulp.dest(cssDest));
});

gulp.task('animate.css', function() {
  gulp.src(['./src/css/animate.css'])
    .pipe(concat('animate.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(cssDest));
});

gulp.task('magnific-popup.css', function() {
  gulp.src(['./src/css/magnific-popup.css'])
    .pipe(concat('magnific-popup.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(cssDest));
});

// IMAGES
gulp.task('images', function() {
   gulp.src(imgSrc)
    .pipe(changed(imgDest))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDest));
  });

// FONTS + ICONS
gulp.task('fonts', function() {
  gulp.src(['./src/css/font_awesome/fonts/**/*'])
    .pipe(gulp.dest(fontDest));
});


// // BROWSER SYNC
// gulp.task('browserSync', function() {
//    browserSync.init({
//       server: {
//          baseDir: 'build'
//       },
//    })
// })

// WATCH
gulp.task('default', ['userStyles', 'userScripts'], function() {

   gulp.watch('src/css/styles.css', function() {
      gulp.run('userStyles');
   })
   gulp.watch('src/js/custom.js', function() {
      gulp.run('userScripts');
   })
});


// BUILD
gulp.task('build', ['images', 'userStyles', 'styles', 'animate.css', 'userScripts', 'scripts', 'fonts', 'magnific-popup.css'], function() {
});

gulp.task('clean:build', function() {
   return del.sync('build');
})

gulp.task('deploy', ['clean:build'])
