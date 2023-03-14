import webpack from 'webpack-stream';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import paths from '../config/paths.js';

export const scriptsBuild = () =>
	gulp
		.src(paths.scripts.src)

		.pipe(
			plumber(
				notify.onError({
					title: 'JS',
					message: 'Error: <%= error.message %>',
				})
			)
		)

		.pipe(
			webpack({
				mode: paths.isProd ? 'production' : 'development',
				output: {
					filename: 'main.min.js',
				},

				devtool: !paths.isProd ? 'source-map' : false,
			})
		)

		.pipe(gulp.dest(paths.scripts.dest));

export const scriptsWatch = () => gulp.watch(paths.scripts.watch, scriptsBuild);
