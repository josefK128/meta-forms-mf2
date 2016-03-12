// * gulpfile.babel.js
// run: $>gulp <taskname>
//
// * NOTE: There is no explicit task 'task-list'. 
//         However 'gulp task-list' will produce a complete list 
//         of tasks and dependencies to stdout
//         pipe to 'gulp-task-list.txt' for exp.


// dependencies for gulpfile 
var gulp = require("gulp");
var tslint = require("gulp-tslint");
var docco = require('gulp-docco');
var del = require('del');
// additional
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var traceur = require('gulp-traceur');
var concat = require('gulp-concat');
var annotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var exec = require('child_process').exec;
require('gulp-task-list')(gulp);
var typescript = require('gulp-typescript');
var tsconfig = require('./tsconfig.json');
 


// directory/file glob-patterns
var tsFiles = [
  './app/modules-ts/*.ts', 
  './app/modules-ts/**/*.ts'
];
var tsTestFiles = [
  './test/modules-ts/*.spec.ts.js', 
  './test/modules-ts/**/*.spec.ts.js' 
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


// additional directory/file glob-patterns
var es6Files = [
  './app/modules_es6/*.js', 
  './app/modules_es6/**/*.js' 
];
var appFiles = [
  './app/modules/*.js', 
  './app/modules/**/*.js' 
];
var utilFiles_ts = [
  './test/utils_ts/*.js', 
];

var utilFiles_es6 = [
  './test/utils_es6/*.js', 
];
var utilFiles = [
  './test/utils/*.js', 
];
var styleFiles = [
  './app/styles/scss/*.scss'
];
var templateFiles = [
  './app/views/templates/*.html', 
  './app/views/templates/**/*.html' 
];
var svgDefsFiles = [
  './app/views/svg/*.svg', 
  './app/views/svg/**/*.svg' 
];
var webglDefsFiles = [
  './app/views/webgl/*.html', 
  './app/views/webgl/**/*.html' 
];


// write destinations
var appDest = './app/modules/',
    appDest_es6 = './app/modules_es6/',
    testDest = './test/modules/',
    testDest_es6 = './test/modules_es6/',
    docDest = './docs/app',
    docTestDest = './docs/test',
    docDevDest = './docs/dev',
// additional
    buildDest = './app/build',
    utilDest = './test/utils',
    cssDest = './app/styles/css',
    docUtilDest = './docs/test/utils',
    templatesDest = './app/views/';




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

// task - ts2js-test: test/modules_ts/x.spec.ts -> 
// test/modules/x.spec.js
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



// additional tasks
// task - tslint:<br>
gulp.task("tslint", () =>
    gulp.src(tsFiles)
        .pipe(tslint())
        .pipe(tslint.report("verbose"))
);


// task - traceur:<br>
// transpile ES6 srcFiles to ES5 appFiles - uses google traceur transpiler
// * NOTE: annotate adds ['dep', function(dep){}] to angular registration 
// to permit correct minification
gulp.task('traceur', () => {
  return gulp.src(srcFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(annotate())
    .pipe(sourcemaps.init())
    .pipe(traceur({sourcemap: true, experimental: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(appDest));
});

// task - traceur-test:<br>
// transpile ES6 testFiles to ES5 testFiles - uses google traceur transpiler
gulp.task('traceur-test', () => {
  return gulp.src(testFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(annotate())
    .pipe(sourcemaps.init())
    .pipe(traceur({sourcemap: true, experimental: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(testDest));
});

// task - traceur-util:<br>
// transpile ES6 utilFiles to ES5 utilFiles - uses google traceur transpiler
gulp.task('traceur-util', () => {
  return gulp.src(utilFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(annotate())
    .pipe(sourcemaps.init())
    .pipe(traceur({sourcemap: true, experimental: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(utilDest));
});


// task - jshint:<br>
// * NOTE: jshint is controlled by the options in './.jshintrc'
gulp.task("jshint", () => {
  gulp.src(srcFiles)
      .pipe(jshint())
      .pipe(jshint.reporter("default"));
});

// task - jshint-test:<br>
// * NOTE: jshint is controlled by the options in './.jshintrc'
gulp.task("jshint-test", () => {
  gulp.src(testFiles)
      .pipe(jshint())
      .pipe(jshint.reporter("default"));
});


// task - sass:<br>
// translates .scss-files to .css-files
gulp.task('sass', () => {
  gulp.src(styleFiles)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/styles/css'));
});



// task - template-cache:<br>
// concatenates individual html/svg/i3d templates into views/templates.html
gulp.task('templates', ['svg-defs', 'webgl-defs'], () => {
  gulp.src(templateFiles)
    .pipe(concat('templates.html'))
    .pipe(gulp.dest(templatesDest));
});

// task - svg-defs:<br>
// concatenates individual symbols, groups etc. into views/svg-defs.svg
gulp.task('svg-defs', () => {
  gulp.src(svgDefsFiles)
    .pipe(concat('svg-defs.svg'))
    .pipe(gulp.dest(templatesDest));
});

// task - webgl-defs:<br>
// concatenates individual shaders, etc. into views/webgl-defs.js
gulp.task('webgl-defs', () => {
  gulp.src(webglDefsFiles)
    .pipe(concat('webgl-defs.html'))
    .pipe(gulp.dest(templatesDest));
});


// task install:<br>
// installs all project dev-dependencies and then dependencies
// * NOTE: assumes that npm is already installed or is global
gulp.task('install', ['npm-install', 'bower-install']);

// task npm-install:<br>
// installs all dev-dependencies listed in package.json for initialization
// writes to ./node_modules
// * NOTE: assumes that npm is already installed or is global
gulp.task('npm-install', () => {
  exec('npm install --save-dev');
});


// task - check-versions:<br>
// check for more recent app-versions then in app/libs, and
// check for more recent dev-versions then in node_modules
gulp.task('check-versions', ['check-npm']);

// task - check-npm:<br>
// check for more recent dev-versions then in node_modules
// * NOTE: --dev checks dev-dependencies also
// * NOTE: --depth 0 ignores dependencies of loaded packages
// * NOTE: --color should display non-breaking changes in red, breaking in yellow
gulp.task('check-npm', () =>{
  exec('npm outdated --dev --depth 0 --color', (err, stdout, stderr) => {
    console.log("\n" + stdout);
    console.log("\n" + stderr);
    if(err){console.log(err);}
  });
});


// task - save-versions:<br>
// copies present bower versions (given by 'bower list') to 
// ./history/bower-versions.<timestamp>
// copies present npm node_module versions (given by 'npm list') to 
// ./history/npm-versions.<timestamp>
// Also copies present bower.json, package.json to ./history
// These saves assist recovery if (manually) updating to newer module 
// version introduces an incompatibility
// * NOTE: --dev updates dev-dependencies also
// * NOTE: --save-dev writes module&version into devDependencies of package.json
// * NOTE: --depth 0 ignores dependencies of loaded packages
gulp.task('save-versions', () =>{
  //var timestamp = new Date().toJSON().slice(0,-1).replace(/[:|T]/g,'-');
  var today = (new Date().toJSON()).replace(/T.*/, ''),
      now = (new Date().toJSON()).replace(/^.*T/, '').replace(/Z/,
      '').replace(/\..+$/, '').replace(/:/g,'-'),
      ts = today + '-' + now;
      tsdir = 'history/'+ ts;
  exec('mkdir ' + ts);
  exec('mv ' +ts+ ' history');
  setTimeout(() =>{
    //exec('npm list --depth 0 > history/npm-versions.' + ts);
    exec('bower list > ' +tsdir+ '/bower-updates');
    exec('cp package.json ' +tsdir+ '/package.json');
    exec('cp bower.json ' +tsdir+ '/bower.json');
    exec('gulp check-versions > ' +tsdir+ '/npm-updates');
  },1000);
});



// task - build:<br>
// archive of previous automated build
gulp.task('build', () => {
   return gulp.src(appFiles)
      .pipe(annotate())
      .pipe(concat('app.js'))
      .pipe(gulp.dest(buildDest));
});

// task - build-min:<br>
// automated build and minification (uglify)
gulp.task('build-min', () => {
   return gulp.src(appFiles)
      .pipe(annotate())
      .pipe(uglify())
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest(buildDest));
});


// task - generate:<br>
// update versions, automated build, build-min, and document
gulp.task('generate', ['sass', 'templates', 'traceur', 'build', 'build-min', 'docco']);


