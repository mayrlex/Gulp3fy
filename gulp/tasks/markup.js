import gulp from 'gulp';
import sync from 'browser-sync';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import gulpif from 'gulp-if';
import versionNumber from 'gulp-version-number';
import pug from 'gulp-pug';
import { setup as emittySetup } from '@zoxon/emitty';
import typograph from 'gulp-typograf';
import pugGlob from 'pug-include-glob';
import paths from '../config/paths.js';

const emittyMarkup = emittySetup(paths.markup.src.emitty, 'pug', {
	makeVinylFile: true,
});

global.isMarkupWatch = false;
global.emittyChangedFile = {
	path: '',
	stats: null,
};

export const markupBuild = () =>
	gulp
		.src(paths.markup.src.main)
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
				paths.isDev,
				pug({
					pretty: true,
					verbose: true,
					plugins: [pugGlob()],
				})
			)
		)
		.pipe(gulpif(paths.isProd, pug({ verbose: true, plugins: [pugGlob()] })))
		.pipe(
			typograph({
				locale: ['ru', 'en-US'],
			})
		)
		.pipe(
			gulpif(
				paths.isProd,
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
		.pipe(gulp.dest(paths.markup.dest))
		.pipe(sync.stream());

export const markupWatch = () => {
	global.isMarkupWatch = true;

	gulp.watch(paths.markup.watch, markupBuild).on('all', (event, filepath, stats) => {
		global.emittyChangedFile = {
			path: filepath,
			stats,
		};
	});
};
