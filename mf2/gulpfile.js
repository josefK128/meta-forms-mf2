// gulpfile.js - automated tasks
// run: $>gulp <taskname>

// dependencies
var gulp = require('gulp');
var tslint = require("gulp-tslint");
var docco = require('gulp-docco');
var del = require('del');
var jasmine = require('gulp-jasmine');



// directory/file glob-patterns
var tsFiles = [
  './app/modules-ts/*.ts', 
  './app/modules-ts/**/*.ts'
];
// only for use by gulp docco - see README-docs-ts.md
var tsjsFiles = [
  './app/modules-ts/*.js', 
  './app/modules-ts/**/*.js'
];
var tsTestFiles = [
  './test/modules-ts/*.spec.ts.js', 
  './test/modules-ts/**/*.spec.ts.js' 
];
var testFiles = [
  './test/modules/*.spec.js', 
  './test/modules/**/*.spec.js' 
];
var devFiles = [
  './gulpfile.js', 
];

// write destinations
var appDest = './app/modules/',
    appDest_es6 = './app/modules_es6/',
    testDest = './test/modules/',
    testDest_es6 = './test/modules_es6/',
    docDest = './docs/modules',
    docTestDest = './docs/test',
    docDevDest = './docs/dev';



gulp.task('default', ['ts2js']);


gulp.task('test', () =>
  // gulp-jasmine works on filepaths so don't have any plugins before it 
  gulp.src(testFiles).pipe(jasmine())
);

gulp.task('ts2js', () => {
    var typescript = require('gulp-typescript'),
        tscConfig = require('./tsconfig.json');

    var tsResult = gulp
        .src(tsFiles)
        .pipe(tslint())
        .pipe(tslint.report("verbose"))
        .pipe(typescript(tscConfig.compilerOptions));

    if(tscConfig.compilerOptions.target === 'es5'){
        return tsResult.js.pipe(gulp.dest(appDest));
    }
    return tsResult.js.pipe(gulp.dest(appDest_es6));
});

gulp.task('ts2js-test', () => {
    var typescript = require('gulp-typescript');
    var tscConfig = require('./tsconfig.json');

    var tsResult = gulp
        .src(tsTestFiles)
        .pipe(tslint())
        .pipe(tslint.report("verbose"))
        .pipe(typescript(tscConfig.compilerOptions));

    if(tscConfig.compilerOptions.target === 'es5'){
        return tsResult.js.pipe(gulp.dest(testDest));
    }
    return tsResult.js.pipe(gulp.dest(testDest_es6));
});


// task - docco:<br>
// generate side-by-side: L comments with R source (configurable)
gulp.task('docco', () =>{
  gulp.src(tsjsFiles)
    .pipe(docco())
    .pipe(gulp.dest(docDest));
  gulp.src(tsTestFiles)
    .pipe(docco())
    .pipe(gulp.dest(docTestDest));
   gulp.src(devFiles)
    .pipe(docco())
    .pipe(gulp.dest(docDevDest));
});


gulp.task('clean', (done) => {
    del(['./app/modules/*.js'], done);
    del(['./app/modules/**/*.js'], done);
    del(['./app/build/*.js'], done);
});


