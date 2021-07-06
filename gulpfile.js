var path = require('path');
var fs = require('fs');
var gulp = require('gulp');
var less = require('gulp-less');
var header = require('gulp-header');
var nano = require('gulp-cssnano');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var comments = require('postcss-discard-comments');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var pkg = require('./package.json');
var clean = require('gulp-clean');
var fileinclude  = require('gulp-file-include');
var uglify = require('gulp-uglify');
var px2rem = require('postcss-px2rem');
var ext_replace = require('gulp-ext-replace');
var yargs = require('yargs').options({
    w: {
        alias: 'watch',
        type: 'boolean'
    },
    s: {
        alias: 'server',
        type: 'boolean'
    },
    p: {
        alias: 'port',
        type: 'number'
    }
}).argv;

var option = { base: 'src' };
var dist = __dirname + '/dist';

gulp.task("clean", function(){
    return gulp.src(dist)
        .pipe(clean());
})







gulp.task('build:pages:html', function() {

    gulp
        .src(option.base+'/pages/*.html', option)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({ stream: true }));
});
gulp.task('build:pages:style', function() {
    gulp
        .src(option.base+'/assets/css/**.less', option)
        .pipe(
            less().on('error', function(e) {
                console.error(e.message);
                this.emit('end');
            })
        )
        .pipe(gulp.dest(dist))
        .pipe(
            nano({
                zindex: false,
                autoprefixer: false
            })
        )
        .pipe(
            rename(function(path) {
                path.basename += '.min';
            })
        )
        .pipe(gulp.dest(dist));
});
gulp.task('build:pages:assets', function() {
    gulp
        .src([option.base+'/assets/**/*.?(png|jpg|gif|js|css|ttf)'], option)
        .pipe(gulp.dest(dist))
});
gulp.task('build:pages', [
    'build:pages:assets',
    'build:pages:style',
    'build:pages:html'
]);



gulp.task('release', ['build:pages']);

gulp.task('watch', ['release'], function() {
    gulp.watch(option.base+'/assets/css/**/*.less', ['build:pages:style']);
    gulp.watch(option.base+'/assets/**/*.?(png|jpg|gif|js|css)', ['build:pages:assets']);
    gulp.watch(option.base+'/**/*.html', ['build:pages:html']);
});


gulp.task('server', function() {
    yargs.p = yargs.p || 8080;
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        ui: {
            port: yargs.p + 1,
            weinre: {
                port: yargs.p + 2
            }
        },
        port: yargs.p,
        startPath: '/pages'
    });
});

// 参数说明
//  -w: 实时监听
//  -s: 启动服务器
//  -p: 服务器启动端口，默认8080
gulp.task('default', ['release'], function() {
    if (yargs.s) {
        gulp.start('server');
    }

    if (yargs.w) {
        gulp.start('watch');
    }
});
