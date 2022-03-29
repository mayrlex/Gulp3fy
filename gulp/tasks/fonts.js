import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';
import { path } from '../config/path.js';

export const otfConvert = () => {
	return gulp
		.src(path.fonts.src.otf, {})
		.pipe(
			plumber(
				notify.onError({
					title: 'FONTS',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(
			fonter({
				formats: ['ttf'],
			})
		)
		.pipe(gulp.dest(path.fonts.root));
};

const fontsBuild = () => {
	return gulp
		.src(path.fonts.src.ttf, {})
		.pipe(
			plumber(
				notify.onError({
					title: 'FONTS',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(ttf2woff2())
		.pipe(gulp.dest(path.fonts.dest));
};

export default fontsBuild;
