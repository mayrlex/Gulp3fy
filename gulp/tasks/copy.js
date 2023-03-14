import gulp from 'gulp';
import paths from '../paths.js';

export const copyBuild = () => gulp.src(paths.resources.src).pipe(gulp.dest(paths.resources.dest));

export const copyWatch = () => gulp.watch(paths.resources.watch, copyBuild);
