import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import { deleteAsync as del } from 'del';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';
import paths from '../paths.js';

const fontsTTF = () =>
	gulp
		.src(paths.fonts.src.otf)
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
		.pipe(gulp.dest(paths.fonts.src.main));

const fontsWOFF2 = () =>
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

const fontsClean = () => del([`${paths.fonts.src.main}*.*`, `!${paths.fonts.src.woff2}`]);
const fontsBuild = () => gulp.src(paths.fonts.src.woff2).pipe(gulp.dest(paths.fonts.dest));

export default gulp.series(fontsWOFF2, fontsClean, fontsBuild);
export { fontsTTF };
export { fontsWOFF2 };
