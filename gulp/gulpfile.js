var gulp = require('gulp'),                      // Gulp JS
    concat = require('gulp-concat'),             // Concat filse
    imagemin = require('gulp-imagemin'),         // Minify images
    uglify = require('gulp-uglify'),             // Minify JS
    include = require('gulp-include'),           // HTML Templates
    csso = require('gulp-csso'),                 // Minify CSS
    autoprefixer = require('gulp-autoprefixer'), // Gulp autoprefixer
    copy2 = require('gulp-copy2'),               // Copy files
    //less = require('gulp-less'),                 // Less compiler
    //sass = require('gulp-sass'),                 // Sass compiler
    path = require('path'),                      // Array of paths to be used for @import directives
    rename = require("gulp-rename");             // Rename files

/*---------------------------------------------------------------------------------*/
/*----------------------------------- COPY ----------------------------------------*/
/*---------------------------------------------------------------------------------*/
gulp.task('copy', function () {
    var paths = [
        {src: 'bower_components/jquery/dist/jquery.min.js', dest: 'dist/js/'},
        {src: 'bower_components/bootstrap/dist/js/bootstrap.min.js', dest: 'dist/js/'},
        {src: 'bower_components/bootstrap/dist/fonts/*.*', dest: 'dist/fonts/'}
    ];
    return copy2(paths);
});
/*---------------------------------------------------------------------------------*/
/*------------------------------ -- CONCAT JS -------------------------------------*/
/*---------------------------------------------------------------------------------*/
gulp.task('concatJs', function() {
    return gulp.src(['bower_components/folder/pluginOneJS', 'bower_components/folder/pluginTwoJS'])
        .pipe(concat('plugins.js'))
        .pipe(gulp.dest('src/js/'));
});
/*---------------------------------------------------------------------------------*/
/*-------------------------------- COMPRESS JS ------------------------------------*/
/*---------------------------------------------------------------------------------*/
gulp.task('compressJs', function() {
    gulp.src('src/js/*.*')
        .pipe(uglify())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest('dist/js/'));
});
/*---------------------------------------------------------------------------------*/
/*------------------------------ COMPRESS IMAGES ----------------------------------*/
/*---------------------------------------------------------------------------------*/
gulp.task('compressImages', () =>
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
);
/*---------------------------------------------------------------------------------*/
/*----------------------------- CSS PREPROCESSORS ---------------------------------*/
/*---------------------------------------------------------------------------------*/
gulp.task('cssPreprocessor', function() {
    //return gulp.src(['src/less/style.less', 'src/less/bootstrap.less'])
    //return gulp.src(['src/sass/style.scss', 'src/sass/bootstrap.sass'])
        //.pipe(less())
        //.pipe(sass())
        .pipe(autoprefixer({browsers: ['last 4 versions']}))
        .pipe(csso())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest('dist/css'))
});
/*---------------------------------------------------------------------------------*/
/*------------------------------- HTML INCLUDES -----------------------------------*/
/*---------------------------------------------------------------------------------*/
gulp.task("includes", function() {
    gulp.src("src/index.html")
        .pipe(include())
        .pipe(gulp.dest("dist/"))
});
/*---------------------------------------------------------------------------------*/
/*---------------------------------- DEFAULT --------------------------------------*/
/*---------------------------------------------------------------------------------*/
gulp.task('default', function(){
    gulp.run('copy', 'concatJs', 'compressJs', 'compressImages', 'cssPreprocessor', 'includes');

    // Watch
    gulp.watch("src/**/*", function(event){
        gulp.run('copy', 'concatJs', 'compressJs', 'compressImages', 'cssPreprocessor', 'includes');
    });
});
