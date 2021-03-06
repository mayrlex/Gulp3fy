'use strict';

// Folders path
let compiled      = require("path").basename(__dirname);
let source        = 'src';

let fs            = require('fs');

// Plugins
let { src, dest } = require('gulp'),
    gulp          = require('gulp'),
    browsersync   = require('browser-sync').create(),        // Автообновление браузера
    fileinclude   = require('gulp-file-include'),            // Включение нескольких html файлов в один
    del           = require('del'),                          // Удаление папки проекта с последующей перезаписью для избавления от лишних файлов
    scss          = require('gulp-sass'),                    // Компиляция scss в css
    autoprefixer  = require('gulp-autoprefixer'),            // Автоматическое дописывание вендорных префиксов в scss
    group_media   = require('gulp-group-css-media-queries'), // Группирование всех @media запросов в конце css файла
    clean_css     = require('gulp-clean-css'),               // Минификация css файла на выходе
    rename        = require('gulp-rename'),                  // Переименование файла перед выгрузкой
    uglify        = require('gulp-uglify-es').default,       // Сжатие js файла
    imagemin      = require('gulp-imagemin'),                // Сжатие изображений
    webp          = require('gulp-webp'),                    // Конвертация изображений в webp
    webphtml      = require('gulp-webp-html'),               // Автоподключение изображений в html
    webpcss       = require('gulp-webpcss'),                 // Автоподключение изображений в css
    svgSprite     = require('gulp-svg-sprite'),              // Создание спрайта из svg
    ttf2woff      = require('gulp-ttf2woff'),                // Конвертация ttf в woff
    ttf2woff2     = require('gulp-ttf2woff2'),               // Конвертация ttf в woff2
    fonter        = require('gulp-fonter'),                  // Конвертация шрифтов
    plumber       = require('gulp-plumber'),                 // Предотвращает разрыв труб
    pug           = require('gulp-pug'),                     // Компиляция pug в html
    prettify      = require('gulp-html-prettify');           // Форматирование html на выходе

// Paths
let path = {
    // Compiled
    build: {
        pug:     compiled + '/',
        css:     compiled + '/assets/css/',
        js:      compiled + '/assets/js/',
        img:     compiled + '/assets/img/',
        fonts:   compiled + '/assets/fonts/',
        cssLib:  compiled + '/assets/css/libs/',
        jsLib:   compiled + '/assets/js/libs/',
    },
    // Source
    src: {
        pug:     source + '/pages/pug/*.pug',
        css:     source + '/styles/*.scss',
        js:      source + "/scripts/*.js",
        img:    [source + '/images/**/*.{jpg,png,svg,gif,ico,webp}', '!**/favicon.*'],
        favicon: source + '/images/general/favicon.{jpg,png,svg,gif,ico,webp}',
        fonts:   source + '/fonts/*.ttf',
        cssLib:  source + '/styles/libs/*.css',
        jsLib:   source + '/scripts/libs/*.js',
    },
    // Watching
    watch: {
        pug:     source + '/pages/pug/**/*.pug',
        css:     source + '/styles/**/*.scss',
        js:      source + "/scripts/**/*.js",
        img:     source + '/images/**/*.{jpg,png,svg,gif,ico,webp}',
        cssLib:  source + '/styles/libs/*.css',
        jsLib:   source + '/scripts/libs/*.js',
    },
    // Clean
    clean: './' + compiled + '/'
};

// Обновление браузера при изменении файлов
function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: './' + compiled + '/'
        },
        port: 3000,
        notify: false
    });
}

// Обработка Pug
function Pug() {
    return src(path.src.pug)
        .pipe(plumber())
        .pipe(pug())
        .pipe(prettify({indent_char: ' ', indent_size: 4}))
        .pipe(dest(path.build.pug))
        .pipe(browsersync.stream());
}

// Обработка SCSS
function css() {
    return src(path.src.css)
        .pipe(plumber())
        .pipe(
            scss({
                outputStyle: 'expanded'
            })
        )
        .pipe(group_media())
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 5 versions'],
                cascade: true
            })
        )
        .pipe(webpcss())
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: '.min.css'
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

// Обработка CSS Libs
function cssLib() {
    return src(path.src.cssLib)
        .pipe(plumber())
        .pipe(clean_css())
        .pipe(dest(path.build.cssLib))
        .pipe(browsersync.stream());
}

// Обработка JS
function js() {
    return src(path.src.js)
        .pipe(plumber())
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: '.min.js'
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

// Обработка JS Libs
function jsLib() {
    return src(path.src.jsLib)
        .pipe(plumber())
        .pipe(uglify())
        .pipe(dest(path.build.jsLib))
        .pipe(browsersync.stream());
}

// Обработка изображений
function images() {
    return src(path.src.img)
        .pipe(
            webp({
                quality: 70
            })
        )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                interlaced: true,
                optimizationLevel: 3 // 0 ot 7
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream());
}

// Обработка favicon
function favicon() {
	return src(path.src.favicon)
		.pipe(plumber())
		.pipe(
			rename({
				extname: ".ico"
			})
		)
		.pipe(dest(path.build.img));
}

// Конвертация .TTF to .WOFF and .TTF to .WOFF2
function fonts() {
    src(path.src.fonts)
        .pipe(plumber())
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts));
}

// Конвертация .OTF to .TTF
gulp.task('otf2ttf', function() {
    return src([source + '/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(source + '/fonts/'));
});

// Создание спрайта
gulp.task('svgSprite', function() {
    return gulp.src([source + '/images/iconsprite/*.svg'])
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../icons/icon.svg', //sprite file name
                    //example: true
                }
            },
        }
        ))
        .pipe(dest(path.build.img));
});

// Запись и подключение шрифтов
function fontsStyle(params) {
    let file_content = fs.readFileSync(source + '/styles/utils/fonts.scss'); 
    if (file_content == '') { 
        fs.writeFile(source + '/styles/utils/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(source + '/styles/utils/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        });
    }
}
    

function cb() {}

// Слежка за файлами
function watchFiles(params) {
    // gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.pug], Pug);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.cssLib], cssLib);
    gulp.watch([path.watch.jsLib], jsLib);

}

// Delete build folder
function clean(params) {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel( Pug, css, js, images, fonts ), cssLib, jsLib, fontsStyle);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.jsLib      = jsLib;
exports.cssLib     = cssLib;
exports.fontsStyle = fontsStyle;
exports.fonts      = fonts;
exports.favicon    = favicon;
exports.images     = images;
exports.js         = js;
exports.css        = css;
exports.pug        = Pug;
// exports.html       = html;
exports.build      = build;
exports.watch      = watch;
exports.default    = watch;