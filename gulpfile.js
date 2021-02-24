//? Глобальные переменные
let prj_folder = require("path").basename(__dirname);
let src_folder = 'src';

//? File sistem
let fs = require('fs');

let path = {
    build: {
        html: prj_folder + '/',
        css: prj_folder + '/assets/css/',
        js: prj_folder + '/assets/js/',
        img: prj_folder + '/assets/img/',
        fonts: prj_folder + '/assets/fonts/',
    },

    src: {
        html: [src_folder + '/*.html', '!' + src_folder + '/_*.html'],
        css: [src_folder + '/scss/*.scss', '!' + src_folder + '/_*.scss'],
        js: src_folder + "/js/*.js",
        favicon: src_folder + "/img/favicon.{jpg,png,svg,gif,ico,webp}",
        img: [src_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}', '!**/favicon.*'],
        fonts: src_folder + '/fonts/*.ttf',
    },

    watch: {
        html: src_folder + '/**/*.html',
        css: src_folder + '/scss/**/*.scss',
        js: src_folder + '/js/**/*.js',
        img: src_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
    },

    clean: './' + prj_folder + '/'
};

//? Обявление расширений
let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),
    clean_css = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    imagemin = require('gulp-imagemin'),
    webp = require('gulp-webp'),
    webphtml = require('gulp-webp-html'),
    webpcss = require('gulp-webpcss'),
    svgSprite = require('gulp-svg-sprite'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    fonter = require('gulp-fonter'),
    plumber = require('gulp-plumber');

//? Синхронизация с браузером
function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: './' + prj_folder + '/'
        },
        port: 3000,
        notify: false
    });
}

//? Обработка HTML
function html() {
    return src(path.src.html)
        .pipe(plumber())
        .pipe(fileinclude())
        .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

//? Обработка CSS
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

//? Обработка JS
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

//? Обработка фавайкона
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

//? Обработка изображений
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

//? Конвертация .TTF to .WOFF and .TTF to .WOFF2
function fonts() {
    src(path.src.fonts)
        .pipe(plumber())
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts));
}

//? Конвертация .OTF to .TTF
//* Функция запускается через терминал
gulp.task('otf2ttf', function() {
    return src([src_folder + '/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(src_folder + '/fonts/'));
});
//? Создание спрайта
//* Функция запускается через терминал
gulp.task('svgSprite', function() {
    return gulp.src([src_folder + '/iconsprite/*.svg'])
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

//? Запись и подключение шрифтов
function fontsStyle(params) {
    let file_content = fs.readFileSync(src_folder + '/includes/scss/_fonts.scss'); 
    if (file_content == '') { 
        fs.writeFile(src_folder + '/includes/scss/_fonts.scss', '', cb); return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(src_folder + '/includes/scss/_fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        });
    }
}
    

function cb() {}

//? Слежка за файлами
function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

//? Чистка билда
function clean(params) {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts), fontsStyle);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.favicon = favicon;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;