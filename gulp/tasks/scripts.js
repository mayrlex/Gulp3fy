import gulp from 'gulp';
import plumber from 'gulp-plumber';
import webpack from 'webpack-stream';
import config from '../config.js';
import paths from '../paths.js';

const scriptsBundle = () =>
	gulp
		.src(paths.scripts.input)
		.pipe(
			plumber({
				errorHandler(error) {
					console.error(error.message);
					this.emit('end');
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
		.pipe(gulp.dest(paths.scripts.output));

export default scriptsBundle;
