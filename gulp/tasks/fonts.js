import gulp from 'gulp';
import plumber from 'gulp-plumber';
import ttf2woff2 from 'gulp-ttf2woff2';
import paths from '../paths.js';

const getFontsWoff2 = () =>
	gulp
		.src(paths.fonts.ttf)
		.pipe(
			plumber({
				errorHandler(error) {
					console.error(error.message);
				},
			})
		)
		.pipe(ttf2woff2())
		.pipe(gulp.dest(paths.fonts.src));

export default getFontsWoff2;
