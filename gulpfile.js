const { src, dest, watch, series} = require('gulp');
const concat = require('gulp-concat');
const sassCompiler = require('sass');
const gulpSass = require('gulp-sass')(sassCompiler);
const fs = require('fs');
const path = require('path');
const {glob} = require ('glob');
const sharp = require('sharp');
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

//esta es una funcion de nodejs, sharp genera imagenes más chicas para mejorar el porformance de la web
async function crop(done) {
    const inputFolder = 'src/img/gallery/full'
    const outputFolder = 'src/img/gallery/thumb';
    const width = 250;
    const height = 180;
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true })
    }
    const images = fs.readdirSync(inputFolder).filter(file => {
        return /\.(jpg)$/i.test(path.extname(file));
    });
    try {
        images.forEach(file => {
            const inputFile = path.join(inputFolder, file)
            const outputFile = path.join(outputFolder, file)
            sharp(inputFile) 
                .resize(width, height, {
                    position: 'centre'
                })
                .toFile(outputFile)
        });

        done()
    } catch (error) {
        console.log(error)
    }
}
exports.crop = crop;
/*
    busca de forma recursiva las imagenes y las convierte en una copia de jpeg y tambien en webp
*/
function imagenes(done) {
    const srcDir = './src/img';
    const buildDir = './build/img';
    const images = glob.sync('./src/img/**/*.{jpg,png}');

    images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file));
        const outputSubDir = path.join(buildDir, relativePath);
        procesarImagenes(file, outputSubDir);
    });

    done();
}


function procesarImagenes(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true })
    }
    const baseName = path.basename(file, path.extname(file))
    const extName = path.extname(file)
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`)
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`)
    const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`)

    const options = { quality: 80 }
    sharp(file).jpeg(options).toFile(outputFile)
    sharp(file).webp(options).toFile(outputFileWebp)
    sharp(file).avif().toFile(outputFileAvif)
}

exports.imagenes = imagenes;

//funcion para hml

function html (){
    return src('src/index.html')
        .pipe(dest('build'));
}
exports.html = html;

// function video (done){ checar para hacerlo con video
//     src('src/video/**/*')
//         .pipe(dest('build/video'));
//     done()
// }
// exports.video =video;

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);
    watch('src/index.html', html);
    watch('src/img/**/*.{png,jpg}', imagenes);
    // watch('src/video/**/*', video);
}
exports.dev = dev;




/*lo que hace series es que inicia una tarea en serie y posteriormente lo finaliza. 
parallel lo que hace es inicar todaas al mismo tiempo para que despues lo finalice
importa mucho el orden en el que se pasa las funciones
*/
exports.default = series(crop,html,js, css,imagenes, dev); //este comando es para desarrollo
exports.build = series(js, css,html); //este comando es para produccion


