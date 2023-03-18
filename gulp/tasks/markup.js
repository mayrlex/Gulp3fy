import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';
import { setup as emittySetup } from '@zoxon/emitty';
import pug from 'gulp-pug';
import pugGlob from 'pug-include-glob';
import typograf from 'gulp-typograf';
import versionNumber from 'gulp-version-number';
import config from '../config.js';
import paths from '../paths.js';

global.isMarkupWatch = false;
global.emittyChangedFile = {
	path: '',
	stats: null,
};

const markupCompile = () => {
	const emittyMarkup = emittySetup(paths.markup.emitty, 'pug', { makeVinylFile: true });

	return gulp
		.src(paths.markup.input)
		.pipe(
			plumber({
				errorHandler(error) {
					console.error(error.message);
					this.emit('end');
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
			typograf({
				locale: ['ru', 'en-US'],
			})
		)
		.pipe(
			gulpif(
				config.isProd,
				versionNumber({
					value: '%MD5%',
					append: {
						key: '_v',
						cover: 1,
						to: ['css', 'js'],
					},
					output: {
						file: 'gulp/cache.json',
					},
				})
			)
		)
		.pipe(gulp.dest(paths.output));
};

export default markupCompile;
