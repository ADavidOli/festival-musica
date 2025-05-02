const { src, dest, watch } = require('gulp');
const sassCompiler = require('sass');
const gulpSass = require('gulp-sass')(sassCompiler);
const fs = require('fs');
const path = require('path');

function css(done) {
    const outputDir = 'build/scss';

    // Crea la carpeta si no existe
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    src('src/scss/app.scss', { sourcemaps: true })
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(dest(outputDir, { sourcemaps: '.' }));

    done();
}

function dev() {
    watch('src/scss/**/*.scss', css);
}

exports.css = css;
exports.dev = dev;
