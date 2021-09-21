import gulp from 'gulp';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import path from '../config.js';

const FaviconBuild = () =>
	gulp
		.src(path.favicon.src)
		.pipe(plumber())
		.pipe(
			rename({
				extname: '.ico',
			})
		)
		.pipe(gulp.dest(path.favicon.dest));

export const faviconBuild = gulp.parallel(FaviconBuild);
export const faviconWatch = () => {
	gulp.watch(path.favicon.watch, FaviconBuild);
};
