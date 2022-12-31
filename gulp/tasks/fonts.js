import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import { deleteAsync } from 'del';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';
import path from '../config/path.js';

const fontsTTF = () => {
	return gulp
		.src(path.fonts.src.otf)
		.pipe(
			plumber(
				notify.onError({
					title: '[FONTS] Convert OTF',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(
			fonter({
				formats: ['ttf'],
			})
		)
		.pipe(gulp.dest(path.fonts.src.main));
};

const fontsWOFF2 = () => {
	return gulp
		.src(path.fonts.src.ttf)
		.pipe(
			plumber(
				notify.onError({
					title: '[FONTS] Convert TTF',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(ttf2woff2())
		.pipe(gulp.dest(path.fonts.src.main));
};

const fontsClean = () => deleteAsync([`${path.fonts.src.main}*.*`, `!${path.fonts.src.woff2}`]);
const fontsBuild = () => gulp.src(path.fonts.src.woff2).pipe(gulp.dest(path.fonts.dest));

export default gulp.series(fontsWOFF2, fontsClean, fontsBuild);
export { fontsTTF };
export { fontsWOFF2 };
