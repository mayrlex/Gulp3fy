import gulp from 'gulp';
import sync from 'browser-sync';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import gulpif from 'gulp-if';
import webphtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';
import pug from 'gulp-pug';
import pugGlob from 'pug-include-glob';
import { path } from '../config/path.js';
import { markupConfig } from '../../config.js';

const markup = [path.markup.watch, path.components.markup];

export const markupBuild = () => {
	return gulp
		.src(path.markup.src)
		.pipe(
			plumber(
				notify.onError({
					title: 'PUG',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(
			pug({
				pretty: markupConfig.pretty,
				verbose: markupConfig.verbose,
				plugins: [pugGlob()],
			})
		)
		.pipe(gulpif(path.isProd, webphtmlNosvg()))
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
};

export const markupWatch = () => gulp.watch(markup, markupBuild);
