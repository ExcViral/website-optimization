var gulp = require('gulp');
// var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');
var imageop = require('gulp-image-optimization');
var webserver = require('gulp-webserver');


/*gulp.task('task-name', function () {
  return gulp.src('source-files') // Get source files with gulp.src
    .pipe(aGulpPlugin()) // Sends it through a gulp plugin
    .pipe(gulp.dest('destination')) // Outputs the file in the destination folder
})*/

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('minifyHTML', function() {
        return gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace:true, minifyJS:true, removeComments:true, minifyCSS:true}))
        .pipe(gulp.dest('dist/'));
});

gulp.task('js', function() {
        gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('css', function(){
   gulp.src('src/css/*.css')
   .pipe(minify())
   .pipe(gulp.dest('dist/css/'));
});

gulp.task('optimizeImages', function(cb) {
    gulp.src(['src/img/*.png','src/img/*.jpg','src/img/*.gif','src/img/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('dist/img/')).on('end', cb).on('error', cb);
});

gulp.task('pizzeria-minifyHTML', function() {
        return gulp.src('src/views/*.html')
        .pipe(htmlmin({collapseWhitespace:true, minifyJS:true, removeComments:true, minifyCSS:true}))
        .pipe(gulp.dest('dist/views/'));
});

gulp.task('pizzeria-js', function() {
        gulp.src('src/views/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/views/js/'));
});

gulp.task('pizzeria-css', function(){
   gulp.src('src/views/css/*.css')
   .pipe(minify())
   .pipe(gulp.dest('dist/views/css/'));
});

gulp.task('pizzeria-optimizeImages', function(cb) {
    gulp.src(['src/views/images/*.png','src/views/images/*.jpg','src/views/images/*.gif','src/views/images/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('dist/views/images/')).on('end', cb).on('error', cb);
});

gulp.task('default',['minifyHTML','js','css','optimizeImages','pizzeria-minifyHTML','pizzeria-css','pizzeria-js','pizzeria-optimizeImages'],function(){
});