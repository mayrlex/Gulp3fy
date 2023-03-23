import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';
import { setup as emittySetup } from '@zoxon/emitty';
import pug from 'gulp-pug';
import pugGlob from 'pug-include-glob';
import prettyHtml from 'gulp-pretty-html';
import typograf from 'gulp-typograf';
import versionNumber from 'gulp-version-number';
import config from '../config.js';
import paths from '../paths.js';

global.isMarkupWatch = false;
global.emittyChangedFile = {
	path: '',
	stats: null,
};

const buildMarkup = () => {
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
		.pipe(pug({ verbose: true, plugins: [pugGlob()] }))
		.pipe(gulpif(config.task.markup.pretty, prettyHtml({ indent_inner_html: true })))
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

export default buildMarkup;
