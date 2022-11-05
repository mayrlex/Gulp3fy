import gulp from 'gulp';
import sync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import gulpif from 'gulp-if';
import compiler from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import media from 'gulp-group-css-media-queries';
import sassGlob from 'gulp-sass-glob';
import path from '../config/path.js';

const sass = gulpSass(compiler);

export const stylesBuild = () => {
	return gulp
		.src(path.styles.src, { sourcemaps: path.isDev })

		.pipe(
			plumber(
				notify.onError({
					title: 'SCSS',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(sassGlob())
		.pipe(
			sass.sync({
				outputStyle: 'expanded',
				includePaths: ['./node_modules'],
			})
		)
		.pipe(media())
		.pipe(
			gulpif(
				path.isProd,
				autoprefixer({
					grid: true,
					overrideBrowserlist: ['last 5 version'],
					cascade: true,
				})
			)
		)
		.pipe(gulp.dest(path.styles.dest))
		.pipe(gulpif(path.isProd, cleanCss({ level: 1 })))
		.pipe(rename({ extname: '.min.css' }))
		.pipe(gulp.dest(path.styles.dest))
		.pipe(sync.stream());
};

export const stylesWatch = () => gulp.watch(path.styles.watch, stylesBuild);
