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
import config from '../config.js';
import paths from '../paths.js';

const sass = gulpSass(compiler);

export const stylesBuild = () =>
	gulp
		.src(paths.styles.src, { sourcemaps: config.isDev })

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
				config.isProd,
				autoprefixer({
					grid: true,
					overrideBrowserlist: ['last 5 version'],
					cascade: true,
				})
			)
		)

		.pipe(gulp.dest(paths.styles.dest, { sourcemaps: '.' }))
		.pipe(
			gulpif(
				config.isProd,
				cleanCss({
					level: {
						1: {
							all: true,
							roundingPrecision: false,
						},

						2: {
							all: true,
							mergeIntoShorthands: false,
							mergeSemantically: false,
							overrideProperties: false,
							reduceNonAdjacentRules: false,
							removeUnusedAtRules: false,
							restructureRules: false,
						},
					},
				})
			)
		)

		.pipe(rename({ extname: '.min.css' }))
		.pipe(gulp.dest(paths.styles.dest, { sourcemaps: '.' }))
		.pipe(sync.stream());

export const stylesWatch = () => gulp.watch(paths.styles.watch, stylesBuild);
