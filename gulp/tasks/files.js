import gulp from 'gulp';
import { path } from '../config/path.js';

const toFiles = () => gulp.src(path.files.src).pipe(gulp.dest(path.files.dest));
const toRoot = () => gulp.src(path.files.root.robots).pipe(gulp.dest(path.files.root.dest));

export const filesBuild = () => toFiles(toRoot());
export const filesWatch = () => gulp.watch(path.files.watch, filesBuild);
