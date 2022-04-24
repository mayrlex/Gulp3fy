import gulp from 'gulp';
import { path } from '../config/path.js';

const assetsFolder = () => gulp.src(path.resources.src).pipe(gulp.dest(path.resources.dest));
const rootFolder = () =>
	gulp.src(path.resources.root.src).pipe(gulp.dest(path.resources.root.dest));

export const resourcesBuild = () => assetsFolder(rootFolder());
export const resourcesWatch = () => gulp.watch(path.resources.watch, resourcesBuild);
