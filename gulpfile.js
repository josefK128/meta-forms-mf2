// * gulpfile.js
// * task automation system
//
// imported task components
var gulp = require("gulp"),
    jshint = require('gulp-jshint'),
    docco = require('gulp-docco');
 



// directory/file glob-patterns
var srcFiles = [
  './app/scripts/*.js', 
  './app/scripts/**/*.js' 
];
var tsFiles = [
  './app/scripts_ts/*.ts', 
  './app/scripts_ts/**/*.ts', 
  './app/scripts_ts/*.js', 
  './app/scripts_ts/**/*.js' 
];
var es6Files = [
  './app_rec_dir/scripts_es6/*.js', 
  './app_rec_dir/scripts_es6/**/*.js' 
];
var testFiles = [
  './test/*.spec.js', 
  './test/**/*.spec.js' 
];
var nodeFiles = [
  './index.js' 
];


// write destinations
var srcDest = './docs/scripts';
var tsDest = './docs/scripts_ts';
var es6Dest = './docs/scripts_es6';
var testDest = './docs/test';
var nodeDest = './docs/node';



// task - jshint:<br>
// * NOTE: jshint is controlled by the options in './.jshintrc'
gulp.task("jshint", function() {
  gulp.src(srcFiles)
      .pipe(jshint())
      .pipe(jshint.reporter("default"));
});

// task - docco:<br>
// generate side-by-side: L comments with R source (configurable)
gulp.task('docco', function(){
  gulp.src(srcFiles)
    .pipe(docco())
    .pipe(gulp.dest(srcDest));
  gulp.src(es6Files)
    .pipe(docco())
    .pipe(gulp.dest(es6Dest));
  gulp.src(testFiles)
    .pipe(docco())
    .pipe(gulp.dest(testDest));
  gulp.src(nodeFiles)
    .pipe(docco())
    .pipe(gulp.dest(nodeDest));
  gulp.src(tsFiles)
    .pipe(docco())
    .pipe(gulp.dest(tsDest));
});



