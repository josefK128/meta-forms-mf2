// gulpfile.js - automated tasks
// run: $>gulp <taskname>

// dependencies
var gulp = require('gulp');
var tslint = require("gulp-tslint");
var docco = require('gulp-docco');


// directory/file glob-patterns
var tsFiles = [
  './app/modules-ts/*.ts', 
  './app/modules-ts/**/*.ts'
];
var tsjsFiles = [
  './app/modules-ts/*.js', 
  './app/modules-ts/**/*.js'
];
var testFiles = [
  './test/**/*.js', 
];
var devFiles = [
  './gulpfile.js', 
];

// write destinations
var docDest = './docs/modules',
    docTestDest = './docs/test',
    docDevDest = './docs/dev';



gulp.task('default', ['ts2js']);


gulp.task('ts2js', () => {
    var typescript = require('gulp-typescript');
    var tscConfig = require('./tsconfig.json');

//    var tsResult = gulp
//        .src(tsFiles)
//        .pipe(typescript(tscConfig.compilerOptions));

    var tsResult = gulp
        .src(tsFiles)
        .pipe(tslint())
        .pipe(tslint.report("verbose"))
        .pipe(typescript(tscConfig.compilerOptions));

    if(tscConfig.compilerOptions.target === 'es5'){
        return tsResult.js.pipe(gulp.dest('./app/modules'));
    }
    return tsResult.js.pipe(gulp.dest('./app/modules-es6/'));
});


// task - docco:<br>
// generate side-by-side: L comments with R source (configurable)
gulp.task('docco', () =>{
  gulp.src(tsjsFiles)
    .pipe(docco())
    .pipe(gulp.dest(docDest));
  gulp.src(testFiles)
    .pipe(docco())
    .pipe(gulp.dest(docTestDest));
   gulp.src(devFiles)
    .pipe(docco())
    .pipe(gulp.dest(docDevDest));
});


gulp.task('clean', (done) => {
    var del = require('del');
    del(['./app/modules'], done);
});

gulp.task('clean-build', (done) => {
    var del = require('del');
    del(['./app/build'], done);
});

