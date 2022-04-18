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
import webpcss from 'gulp-webpcss';
import media from 'gulp-group-css-media-queries';
import sassGlob from 'gulp-sass-glob';
import { path } from '../config/path.js';
import { stylesConfig } from '../../config.js';

const sass = gulpSass(compiler);

const styles = [path.styles.watch, path.components.styles];

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
				outputStyle: stylesConfig.sass.outputStyle,
				includePaths: ['./node_modules'],
			})
		)
		.pipe(gulpif(path.isProd, media()))
		.pipe(
			gulpif(
				path.isProd,
				webpcss({
					webpClass: '.webp',
					noWebpClass: '.no-webp',
				})
			)
		)
		.pipe(
			autoprefixer({
				grid: stylesConfig.autoprefixer.grid,
				overrideBrowserlist: [stylesConfig.autoprefixer.overrideBrowserlist],
				cascade: stylesConfig.autoprefixer.cascade,
			})
		)
		.pipe(gulp.dest(path.styles.dest))
		.pipe(
			gulpif(
				path.isProd,
				cleanCss({
					level: stylesConfig.cleanlvl,
				})
			)
		)
		.pipe(
			rename({
				extname: '.min.css',
			})
		)
		.pipe(gulp.dest(path.styles.dest))
		.pipe(sync.stream());
};

export const stylesWatch = () => gulp.watch(styles, stylesBuild);
