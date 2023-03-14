import gulp from 'gulp';
import paths from '../config/paths.js';

export const resourcesBuild = () =>
	gulp
		.src(paths.resources.src.main)
		.pipe(gulp.dest(paths.resources.dest.main))
		.pipe(gulp.src(paths.resources.src.exception))
		.pipe(gulp.dest(paths.resources.dest.exception));

export const resourcesWatch = () => gulp.watch(paths.resources.watch, resourcesBuild);
