// crea funciones en js
//necesitas la sintaxis moderna para exportar 
//importamos todo lo que tenga que ver con sass
//gulp maneja modules con la extension mjs (aunque algunos plugins no son compatibles con este tipo de modules)
//y maneja con config.js cuando pasa de un compilable
// import {src, dest, watch} from 'gulp' 
// import * as dartSass from 'sass'
// //esto es para utilizar sass en archivo de gulpfile
// import gulpSass from 'gulp-sass'
//esta forma es para gulp.js

const {src, dest, watch} = require ('gulp');
const sassCompiler = require('sass');
const gulpSass = require('gulp-sass')(sassCompiler);;


function css(done){
    //cada una de las funciones ss controlan con.
    src('src/scss/app.scss')
        .pipe(gulpSass().on('error',gulpSass.logError)) //manejo de errores con log
        //una vez que encuentra el archivo, busca el pipe y lo compila.
        .pipe(dest('build/scss'))
    done();
}
    //habiliamos el watch para los cambios.
function dev(){
    watch('src/scss/**/*.scss',css)

}

exports.css = css;
exports.dev = dev;