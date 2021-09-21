import gulp from 'gulp';
import compiler from 'sass';
import gulpSass from 'gulp-sass';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import gulpGroup from 'gulp-group-css-media-queries';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import gulpif from 'gulp-if';
import sassGlob from 'gulp-sass-glob';
import path from '../config.js';

const sass = gulpSass(compiler);

const StylesBuild = () =>
	gulp
		.src(path.styles.src, { sourcemaps: path.isDev })
		.pipe(plumber())
		.pipe(sassGlob())
		.pipe(
			sass({
				outputStyle: 'expanded',
				includePaths: ['./node_modules'],
			})
		)

		.pipe(gulpif(path.isProd, gulpGroup()))
		.pipe(
			gulpif(
				path.isProd,
				autoprefixer({
					overrideBrowserslist: ['last 5 version'],
				})
			)
		)

		.pipe(gulpif(path.isProd, gulp.dest(path.styles.dest)))
		.pipe(
			gulpif(
				path.isProd,
				cleanCSS({
					level: 1,
				})
			)
		)

		.pipe(
			rename({
				suffix: '.min',
			})
		)

		.pipe(
			gulp.dest(path.styles.dest, {
				sourcemaps: path.isDev,
			})
		);

export const stylesBuild = gulp.series(StylesBuild);
export const stylesWatch = () => gulp.watch(path.styles.watch, StylesBuild);
