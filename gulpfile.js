'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

gulp.task('connect', function () {
    connect.server({
        root: 'app',                    // Main app folder
        port: 8080,                     // localhost:8080
        livereload: true,               // Allow us to reload any time we want
        fallback: './app/index.html'      // if HTML5 enabled this is required
    });
});

gulp.task('sass', function () {
    gulp.src('./app/**/*.scss')
        .pipe(compass({
            config_file: './app/assets/config.rb',
            css: './app/assets/css',
            sass: './app/assets/sass'
        }))
        .pipe(gulp.dest('temp'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('./app/**/*.html')
        .pipe(connect.reload());
});

gulp.task('json', function () {
    gulp.src('./app/**/*.json')
        .pipe(connect.reload());
});

gulp.task('js', function () {
    return gulp.src([
            './app/utils.js',
            './app/app.js',
            './app/features/**/module.*.js',
            './app/features/**/service.*.js',
            './app/features/**/controller.*.js'
        ])
        .pipe(concat('app.js'))                     // Name of concat file
        .pipe(gulp.dest('./app/assets/js/'))        // Folder to save the file
        .pipe(connect.reload());                    // Force the reload to see the changes
});
gulp.task('js:compress', function () {
    return gulp.src(['./app/assets/js/app.js'])
        .pipe(concat('app.js'))
        .pipe(uglify({
            mangle: false        // Feature to replace original function names with sort ones (not working for now)
        }))
        .pipe(gulp.dest('./app/assets/js/'))
});

gulp.task('watch', function () {
    gulp.watch(['./app/**/*.html'], ['html']);
    gulp.watch(['./app/**/*.js', '!./app/assets/**/*.js'], ['js']);
    gulp.watch(['./app/**/*.scss'], ['sass']);
});

gulp.task('vendors:css', function () {
    return gulp.src([
            './bower_components/angular-loading-bar/build/loading-bar.min.css',
            './bower_components/material-design-iconic-font/dist/css/material-design-iconic-font.min.css',
            './bower_components/bootstrap/dist/css/bootstrap.min.css'
        ])
        .pipe(concat('vendors.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./app/assets/css/'));
});

gulp.task('vendors:js', function () {
    return gulp.src([
            './bower_components/angular/angular.min.js',
            './bower_components/angular-permission/dist/angular-permission.js',
            './bower_components/angular-ui-router/release/angular-ui-router.min.js',
            './bower_components/angular-sanitize/angular-sanitize.min.js',
            './bower_components/angular-loading-bar/build/loading-bar.min.js',
            './bower_components/ngstorage/ngStorage.min.js',
            './bower_components/angular-animate/angular-animate.min.js',

            './lib/ui-bootstrap/ui-bootstrap-custom-tpls-0.14.3.min.js'
        ])
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./app/assets/js/'));
});

gulp.task('vendors', ['vendors:js', 'vendors:css']);
gulp.task('start', ['connect', 'watch', 'sass', 'vendors', 'js']);
gulp.task('compile', ['vendors', 'js', 'js:compress']);