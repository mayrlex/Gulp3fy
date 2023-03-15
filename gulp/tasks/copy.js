import gulp from 'gulp';
import paths from '../paths.js';

const copyRootFiles = () => gulp.src(paths.resources.root).pipe(gulp.dest(paths.dest));
const copyResources = () => gulp.src(paths.resources.src).pipe(gulp.dest(paths.resources.dest));
const copyFavicons = () => gulp.src(paths.favicon.src).pipe(gulp.dest(paths.favicon.dest));
const copyFonts = () => gulp.src(paths.fonts.woff2).pipe(gulp.dest(paths.fonts.dest));

export const copy = gulp.parallel(copyRootFiles, copyResources, copyFavicons, copyFonts);
export const copyWatch = () => gulp.watch(paths.resources.watch, copyResources);
export { copyFonts };
