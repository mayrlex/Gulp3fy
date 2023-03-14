import gulp from 'gulp';
import paths from '../paths.js';

export const resourcesBuild = () =>
	gulp.src(paths.resources.src).pipe(gulp.dest(paths.resources.dest));

export const resourcesWatch = () => gulp.watch(paths.resources.watch, resourcesBuild);
