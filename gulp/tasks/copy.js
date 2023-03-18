import gulp from 'gulp';
import paths from '../paths.js';

const copyRootFiles = () => gulp.src(paths.resources.root).pipe(gulp.dest(paths.output));
const copyResources = () => gulp.src(paths.resources.input).pipe(gulp.dest(paths.resources.output));
const copyFavicons = () => gulp.src(paths.favicon.input).pipe(gulp.dest(paths.favicon.output));
const copyFonts = () => gulp.src(paths.fonts.woff2).pipe(gulp.dest(paths.fonts.output));

const copy = gulp.parallel(copyRootFiles, copyResources, copyFavicons, copyFonts);

export default copy;
export { copyResources };
export { copyFonts };
