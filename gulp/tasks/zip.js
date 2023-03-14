import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import { deleteAsync } from 'del';
import gzip from 'gulp-zip';
import paths from '../config/paths.js';

const zip = () => {
	deleteAsync(paths.zip.del);

	return gulp
		.src(paths.zip.compiled, {})
		.pipe(
			plumber(
				notify.onError({
					title: 'ZIP',
					message: 'Error: <%= error.message %>',
				})
			)
		)

		.pipe(gzip(paths.zip.root))

		.pipe(gulp.dest('./'));
};

export default zip;
