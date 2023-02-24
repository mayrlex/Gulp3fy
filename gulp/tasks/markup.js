import gulp from 'gulp';
import sync from 'browser-sync';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import gulpif from 'gulp-if';
import versionNumber from 'gulp-version-number';
import pug from 'gulp-pug';
import { setup as emittySetup } from '@zoxon/emitty';
import pugGlob from 'pug-include-glob';
import path from '../config/path.js';

const emittyMarkup = emittySetup(path.markup.src.emitty, 'pug', {
	makeVinylFile: true,
});

global.isMarkupWatch = false;
global.emittyChangedFile = {
	path: '',
	stats: null,
};

export const markupBuild = () =>
	gulp
		.src(path.markup.src.main)
		.pipe(
			plumber(
				notify.onError({
					title: 'PUG',
					message: 'Error: <%= error.message %>',
				})
			)
		)

		.pipe(
			gulpif(
				global.isMarkupWatch,
				emittyMarkup.stream(global.emittyChangedFile.path, global.emittyChangedFile.stats)
			)
		)
		.pipe(
			gulpif(
				path.isDev,
				pug({
					pretty: true,
					verbose: true,
					plugins: [pugGlob()],
				})
			)
		)
		.pipe(gulpif(path.isProd, pug({ verbose: true, plugins: [pugGlob()] })))
		.pipe(
			gulpif(
				path.isProd,
				versionNumber({
					value: '%DT%',
					append: {
						key: '_v',
						cover: 0,
						to: ['css', 'js'],
					},
					output: {
						file: 'gulp/version.json',
					},
				})
			)
		)
		.pipe(gulp.dest(path.markup.dest))
		.pipe(sync.stream());

export const markupWatch = () => {
	global.isMarkupWatch = true;

	gulp.watch(path.markup.watch, markupBuild).on('all', (event, filepath, stats) => {
		global.emittyChangedFile = {
			path: filepath,
			stats,
		};
	});
};
