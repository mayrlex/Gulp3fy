import webpack from 'webpack-stream';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import sync from 'browser-sync';
import path from '../config/path.js';

export const scriptsBuild = () => {
	return gulp
		.src(path.scripts.src)

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
				mode: path.isProd ? 'production' : 'development',
				output: {
					filename: 'app.min.js',
				},

				devtool: !path.isProd ? 'source-map' : false,
			})
		)

		.pipe(gulp.dest(path.scripts.dest))
		.pipe(sync.stream());
};

export const scriptsWatch = () => gulp.watch(path.scripts.watch, scriptsBuild);
