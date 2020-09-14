const {src, dest, watch, parallel, series} = require("gulp");
const concat = require("gulp-concat");
const cssConcat = require("gulp-concat-css");
const minify = require("gulp-clean-css");
const uglify = require('gulp-uglify-es').default;

//File paths
const files = {
    cssPath: "src/**/*.css",
    htmlPath: "src/**/*.html",
    jsPath: "src/**/*.js",
    imgPath: "src/pictures/*.*"
}

//Copies all HTML files to publish-folder
function htmlTasks() {
    return src(files.htmlPath)
        .pipe(dest('pub'));
}

//Copies all images to publish-folder
function imgTasks() {
    return src(files.imgPath)
        .pipe(dest('pub/pictures'));
}

//Minifies and concats all css files to publish css-folder
function cssTasks() {
    return src(files.cssPath)
        .pipe(cssConcat('styles.css'))
        .pipe(minify())
        .pipe(dest('pub/css'));
}

//Minifies and concats all js files to publish js-folder
function jsTasks() {
    return src(files.jsPath)
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(dest('pub/js'));
}

//Watcher
function watchTasks() {
    watch([files.htmlPath, files.jsPath, files.cssPath, files.imgPath],
        parallel(htmlTasks, imgTasks, cssTasks, jsTasks));
}

//Default task
exports.default = series(
    parallel(htmlTasks, imgTasks, cssTasks, jsTasks),
    watchTasks
);