import gulp from 'gulp';
import { path } from '../config/path.js';

export const filesBuild = () => gulp.src(path.files.src).pipe(gulp.dest(path.files.dest));
export const filesWatch = () => gulp.watch(path.files.watch, filesBuild);
export const robots = () => gulp.src(path.files.robots.src).pipe(gulp.dest(path.files.robots.dest));
