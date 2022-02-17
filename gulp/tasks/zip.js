import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import del from 'del';
import gzip from 'gulp-zip';
import { path } from '../config/path.js';

const zip = () => {
	del(path.zip.del);

	return gulp
		.src(path.zip.compiled, {})
		.pipe(
			plumber(
				notify.onError({
					title: 'ZIP',
					message: 'Error: <%= error.message %>',
				})
			)
		)

		.pipe(gzip(path.zip.root))

		.pipe(gulp.dest('./'));
};

export default zip;
