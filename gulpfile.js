const { src, dest, watch, series} = require('gulp');
const concat = require('gulp-concat');
const sassCompiler = require('sass');
const gulpSass = require('gulp-sass')(sassCompiler);
const fs = require('fs');
const path = require('path');
const terser = require('gulp-terser');

//funciona para js
//minificamos nuestro js
function js (){
    return src('src/js/**/*.js')
        .pipe(terser())
        .pipe(dest('build/js'))
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
        .pipe(gulpSass({
            outputStyle:'compressed'
        }).on('error', gulpSass.logError))
        .pipe(dest(outputDir, { sourcemaps: '.' }));

    done();
}
exports.css = css;

//funcion para hml

function html (){
    return src('src/index.html')
        .pipe(dest('build'));
}
exports.html = html;

// //funcion para imagenes checar como copiar y mover bien las imgs y video, de mientras se hizo de forma manual
// function images (done){
//      src('src/img/**/*')
//         .pipe(imagemin())
//         .pipe(dest('build/img'));
//     done()
// }
// exports.images = images;

// function video (done){
//     src('src/video/**/*')
//         .pipe(dest('build/video'));
//     done()
// }
// exports.video =video;

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);
    watch('src/index.html', html);
    // watch('src/img/**/*', images);
    // watch('src/video/**/*', video);
}
exports.dev = dev;




/*lo que hace series es que inicia una tarea en serie y posteriormente lo finaliza. 
parallel lo que hace es inicar todaas al mismo tiempo para que despues lo finalice
importa mucho el orden en el que se pasa las funciones
*/
exports.default = series(html,js, css, dev); //este comando es para desarrollo
exports.build = series(js, css,html); //este comando es para produccion


