import gulp from 'gulp';
import pug from 'gulp-pug';
import prettify from 'gulp-pretty-html';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import { setup as emittySetup } from '@zoxon/emitty';
import pugGlob from 'pug-include-glob';
import { path, pretty } from '../../config.js';

const emittyPug = emittySetup(path.views.emitty, 'pug', {
	makeVinylFile: true,
});

global.isPugWatch = false;
global.emittyChangedFile = {
	path: '',
	stats: null,
};

export const viewsBuild = () =>
	gulp
		.src(path.views.src)
		.pipe(plumber())
		.pipe(
			gulpif(global.isPugWatch, emittyPug.stream(global.emittyChangedFile.path, global.emittyChangedFile.stats))
		)
		.pipe(pug({ plugins: [pugGlob()] }))
		.pipe(prettify(pretty))
		.pipe(gulp.dest(path.views.dest));

export const viewsWatch = () => {
	global.isPugWatch = true;

	gulp.watch(path.views.watch, viewsBuild).on('all', (event, filepath, stats) => {
		global.emittyChangedFile = {
			path: filepath,
			stats,
		};
	});
};
