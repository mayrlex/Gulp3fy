'use strict';

// Folders path
let prj_folder = require("path").basename(__dirname);
let src_folder = 'src';

let fs = require('fs');

let path = {
    // Compiled
    build: {
        // html: prj_folder + '/',
        pug: prj_folder + '/',
        css: prj_folder + '/assets/css/',
        js: prj_folder + '/assets/js/',
        img: prj_folder + '/assets/img/',
        fonts: prj_folder + '/assets/fonts/',
        cssLib: prj_folder + '/assets/css/lib/',
        jsLib: prj_folder + '/assets/js/lib/',
    },
    // Source
    src: {
        // html: src_folder + '/html/*.html',
        pug: src_folder + '/pug/*.pug',
        css: src_folder + '/static/scss/*.scss',
        js: src_folder + "/static/js/*.js",
        favicon: src_folder + '/static/img/favicon.{jpg,png,svg,gif,ico,webp}',
        img: [src_folder + '/static/img/**/*.{jpg,png,svg,gif,ico,webp}', '!**/favicon.*'],
        fonts: src_folder + '/static/fonts/*.ttf',
        cssInc: src_folder + '/includes/scss/*.scss',
        jsInc: src_folder + '/includes/js/*.js',
        cssLib: src_folder + '/static/libs/css/*.css',
        jsLib: src_folder + '/static/libs/js/*.js',
    },
    // Watching
    watch: {
        // html: src_folder + '/**/*.html',
        pug: src_folder + '/**/*.pug',
        css: src_folder + '/static/scss/*.scss',
        js: src_folder + "/static/js/*.js",
        img: src_folder + '/static/img/**/*.{jpg,png,svg,gif,ico,webp}',
        cssInc: src_folder + '/includes/scss/*.scss',
        jsInc: src_folder + '/includes/js/*.js',
        cssLib: src_folder + '/static/libs/css/*.css',
        jsLib: src_folder + '/static/libs/js/*.js',
    },

    // Удаление папки проекта при запуске Gulp
    clean: './' + prj_folder + '/'
};

// Переменные расширений
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

    // Обновление браузера при изменении файлов
function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: './' + prj_folder + '/'
        },
        port: 3000,
        notify: false
    });
}

// // Обработка HTML
// function html() {
//     return src(path.src.html)
//         .pipe(plumber())
//         .pipe(fileinclude())
//         .pipe(webphtml())
//         .pipe(dest(path.build.html))
//         .pipe(browsersync.stream());
// }

// Обработка Pug
function Pug() {
    return src(path.src.pug)
        .pipe(plumber())
        .pipe(pug())
        .pipe(prettify({indent_char: ' ', indent_size: 4}))
        // .pipe(webphtml()) Проблема из-за которой html код компилится в строку, в поисках этой неполадки я потратил целый день
        .pipe(dest(path.build.pug))
        .pipe(browsersync.stream());
}

// Обработка CSS
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

// Обработка SCSS Includes
function cssInc() {
    return src(path.src.cssInc)
        .pipe(plumber())
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

// Обработка JS Includes
function jsInc() {
    return src(path.src.jsInc)
        .pipe(plumber())
        .pipe(fileinclude())
        .pipe(browsersync.stream());
}

// Обработка фавайкона
function favicon() {
	return src(path.src.favicon)
		.pipe(plumber())
		.pipe(
			rename({
				extname: ".ico"
			})
		)
		.pipe(dest(path.build.html));
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
// Функция запускается через терминал
gulp.task('otf2ttf', function() {
    return src([src_folder + '/static/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(src_folder + '/static/fonts/'));
});
// Создание спрайта
// Функция запускается через терминал
gulp.task('svgSprite', function() {
    return gulp.src([src_folder + '/static/img/iconsprite/*.svg'])
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
    let file_content = fs.readFileSync(src_folder + '/includes/scss/fonts.scss'); 
    if (file_content == '') { 
        fs.writeFile(src_folder + '/includes/scss/fonts.scss', '', cb); return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(src_folder + '/includes/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
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
    gulp.watch([path.watch.cssInc], cssInc);
    gulp.watch([path.watch.jsInc], jsInc);
    gulp.watch([path.watch.cssLib], cssLib);
    gulp.watch([path.watch.jsLib], jsLib);

}

// Удаление папки проекта с последующей перезаписью
function clean(params) {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, Pug, images, fonts, cssInc, jsInc), cssLib, jsLib, fontsStyle);
let watch = gulp.parallel(build, watchFiles, browserSync);

// Объявление переменных для Gulp
exports.cssInc     = cssInc;
exports.jsInc      = jsInc;
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