import gulp from 'gulp';
import sync from 'browser-sync';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import gulpif from 'gulp-if';
import versionNumber from 'gulp-version-number';
import pug from 'gulp-pug';
import pugGlob from 'pug-include-glob';
import path from '../config/path.js';

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
};

export const markupWatch = () => gulp.watch(path.markup.watch, markupBuild);
