import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import ttf2woff2 from 'gulp-ttf2woff2';
import paths from '../paths.js';

const getFontsWoff2 = () =>
	gulp
		.src(paths.fonts.src.ttf)
		.pipe(
			plumber(
				notify.onError({
					title: '[FONTS] Convert TTF',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(ttf2woff2())
		.pipe(gulp.dest(paths.fonts.src.main));

export default getFontsWoff2;
