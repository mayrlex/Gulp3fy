import gulp from 'gulp';
import sync from 'browser-sync';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';
import versionNumber from 'gulp-version-number';
import pug from 'gulp-pug';
import { setup as emittySetup } from '@zoxon/emitty';
import typograph from 'gulp-typograf';
import pugGlob from 'pug-include-glob';
import config from '../config.js';
import paths from '../paths.js';

const emittyMarkup = emittySetup(paths.markup.emitty, 'pug', {
	makeVinylFile: true,
});

global.isMarkupWatch = false;
global.emittyChangedFile = {
	path: '',
	stats: null,
};

export const markupBuild = () =>
	gulp
		.src(paths.markup.src)
		.pipe(
			plumber({
				errorHandler(error) {
					console.error(error.message);
				},
			})
		)

		.pipe(
			gulpif(
				global.isMarkupWatch,
				emittyMarkup.stream(global.emittyChangedFile.path, global.emittyChangedFile.stats)
			)
		)
		.pipe(
			gulpif(
				config.isDev,
				pug({
					pretty: true,
					verbose: true,
					plugins: [pugGlob()],
				})
			)
		)
		.pipe(gulpif(config.isProd, pug({ verbose: true, plugins: [pugGlob()] })))
		.pipe(
			typograph({
				locale: ['ru', 'en-US'],
			})
		)
		.pipe(
			gulpif(
				config.isProd,
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
