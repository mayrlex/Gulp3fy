import gulp from 'gulp';
import plumber from 'gulp-plumber';
import { deleteAsync } from 'del';
import gzip from 'gulp-zip';
import paths from '../paths.js';

const zip = () => {
	deleteAsync(paths.zip.del);

	return gulp
		.src(paths.zip.compiled, {})
		.pipe(
			plumber({
				errorHandler(error) {
					console.error(error.message);
				},
			})
		)

		.pipe(gzip(paths.zip.root))

		.pipe(gulp.dest('./'));
};

export default zip;
