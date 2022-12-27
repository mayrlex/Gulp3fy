import gulp from 'gulp';
import path from '../config/path.js';

export const resourcesBuild = () =>
	gulp
		.src(path.resources.src.main)
		.pipe(gulp.dest(path.resources.dest.main))
		.pipe(gulp.src(path.resources.src.exception))
		.pipe(gulp.dest(path.resources.dest.exception));

export const resourcesWatch = () => gulp.watch(path.resources.watch, resourcesBuild);
