import gulp from 'gulp';
import paths from '../paths.js';

const copyFavicons = () => gulp.src(paths.favicon.src).pipe(gulp.dest(paths.favicon.dest));
const copyRootFiles = () => gulp.src(paths.resources.root).pipe(gulp.dest(paths.dest));
const copyResources = () => gulp.src(paths.resources.src).pipe(gulp.dest(paths.resources.dest));

export const copyBuild = gulp.parallel(copyFavicons, copyRootFiles, copyResources);
export const copyWatch = () => gulp.watch(paths.resources.watch, copyBuild);
