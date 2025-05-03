const { src, dest, watch, series} = require('gulp');
const concat = require('gulp-concat');
const sassCompiler = require('sass');
const gulpSass = require('gulp-sass')(sassCompiler);
const fs = require('fs');
const path = require('path');

//funciona para js
function js (done){
    return src('src/js/**/*.js')
        .pipe(dest('build/js'))

    done();
}
exports.js = js;

//funciona para css
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
exports.css = css;

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);

}
exports.dev = dev;

/*lo que hace series es que inicia una tarea en serie y posteriormente lo finaliza. 
parallel lo que hace es inicar todaas al mismo tiempo para que despues lo finalice
importa mucho el orden en el que se pasa las funciones
*/
exports.default = series(js, css, dev);

