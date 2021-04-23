const { src, dest, watch, parallel, series } = require('gulp');

const scss          = require('gulp-sass');
const concat        = require('gulp-concat');
const browserSync   = require('browser-sync').create();
const uglify        = require('gulp-uglify-es').default;
const autoprefixer  = require('gulp-autoprefixer');
const del           = require('del');

function synchronize(){
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    })
}

function cleanDist(){
    return del('dist');
}

function convertScripts(){
    return src(['app/js/main.js'])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function convertStyles(){
    return src('app/scss/style.scss')
        .pipe(scss({ outputStyle: 'compressed' }))        
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer())
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function build(){
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/main.min.js',
        'app/*.html'
    ], { base: 'app'})
        .pipe(dest('dist'))
}

function watching(){
    watch(['app/scss/**/*.scss'], convertStyles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], convertScripts);
    watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = convertStyles;
exports.watching = watching;
exports.sync = synchronize;
exports.scripts = convertScripts;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, build);
exports.default = parallel(convertScripts, synchronize, watching)