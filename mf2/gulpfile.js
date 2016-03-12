// gulpfile.js - automated tasks
// run: $>gulp <taskname>


// dependencies
var gulp = require('gulp');
var tslint = require("gulp-tslint");
var docco = require('gulp-docco');
var del = require('del');



// directory/file glob-patterns
var tsFiles = [
  './app/modules-ts/*.ts', 
  './app/modules-ts/**/*.ts'
];
var tsTestFiles = [
  './test/modules-ts/*.spec.ts', 
  './test/modules-ts/**/*.spec.ts' 
];
var tsTestMocks = [
  './test/modules-ts/mocks/*.ts' 
];
// only for use by gulp docco - see README-docs-ts.md
var tsjsFiles = [
  './app/modules-ts/*.ts.js', 
  './app/modules-ts/**/*.ts.js'
];
var tsjsTestFiles = [
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
    mockDest = './test/modules/mocks/',
    mockDest_es6 = './test/modules_es6/mocks',
    docDest = './docs/app',
    docTestDest = './docs/test',
    docDevDest = './docs/dev';



// task - ts2js: modules_ts/x.ts -> modules/x.js
// NOTE: default task!
gulp.task('default', ['ts2js']);
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


// task - ts2js-test: 
gulp.task('ts2js-test', ['ts2js-mock', 'ts2js-spec']);

// task - ts2js-spec: test/modules_ts/x.spec.ts -> 
// test/modules/x.spec.js
gulp.task('ts2js-spec', () => {
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
// task - ts2js-spec: test/modules_ts/x.spec.ts -> 
// test/modules/x.spec.js
gulp.task('ts2js-spec-no-tslint', () => {
    var typescript = require('gulp-typescript');
    var tscConfig = require('./tsconfig.json');

    var tsResult = gulp
        .src(tsTestFiles)
        .pipe(typescript(tscConfig.compilerOptions));

    if(tscConfig.compilerOptions.target === 'es5'){
        return tsResult.js.pipe(gulp.dest(testDest));
    }
    return tsResult.js.pipe(gulp.dest(testDest_es6));
});

// task - ts2js-mock: test/modules_ts/mocks/x.ts -> 
// test/modules/mocks/x.js
gulp.task('ts2js-mock', () => {
    var typescript = require('gulp-typescript');
    var tscConfig = require('./tsconfig.json');

    var tsResult = gulp
        .src(tsTestMocks)
        .pipe(tslint())
        .pipe(tslint.report("verbose"))
        .pipe(typescript(tscConfig.compilerOptions));

    if(tscConfig.compilerOptions.target === 'es5'){
        return tsResult.js.pipe(gulp.dest(mockDest));
    }
    return tsResult.js.pipe(gulp.dest(mockDest_es6));
});


// task - docco:<br>
// generate side-by-side: L comments with R source (configurable)
// NOTE: docco does not process ts-files, so a temporary
// ts.js-file is provided for docco-only processing usage
// These files are in 'tsjsFiles' and 'tsjsTestFiles'
gulp.task('docco', () =>{
  gulp.src(tsFiles)
    .pipe(docco())
    .pipe(gulp.dest(docDest));
  gulp.src(tsTestFiles)
    .pipe(docco())
    .pipe(gulp.dest(docTestDest));
  gulp.src(tsjsFiles)
    .pipe(docco())
    .pipe(gulp.dest(docDest));
  gulp.src(tsjsTestFiles)
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


