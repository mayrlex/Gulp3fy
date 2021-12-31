import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import rename from 'gulp-rename';
import { path } from '../config/path.js';

const faviconsBuild = () =>
	gulp
		.src(path.favicon.src)
		.pipe(
			plumber(
				notify.onError({
					title: 'FONTS',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(
			rename({
				extname: '.ico',
			})
		)
		.pipe(gulp.dest(path.favicon.dest));

export default faviconsBuild;
