import webpack from 'webpack-stream';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import config from '../config.js';
import paths from '../paths.js';

export const scriptsBuild = () =>
	gulp
		.src(paths.scripts.src)

		.pipe(
			plumber({
				errorHandler(error) {
					console.error(error.message);
				},
			})
		)

		.pipe(
			webpack({
				mode: config.mode,
				output: {
					filename: 'main.min.js',
				},

				devtool: config.isDev ? 'source-map' : undefined,
			})
		)

		.pipe(gulp.dest(paths.scripts.dest));

export const scriptsWatch = () => gulp.watch(paths.scripts.watch, scriptsBuild);
