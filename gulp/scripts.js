import gulp from 'gulp';
import browserify from 'browserify';
import plumber from 'gulp-plumber';
import vinylStream from 'vinyl-source-stream';
import vinylBuffer from 'vinyl-buffer';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import gulpif from 'gulp-if';
import { path } from '../config.js';

export const scriptsBuild = () =>
	browserify(path.scripts.src, { debug: true })
		.transform('babelify', { presets: ['@babel/preset-env'] })
		.bundle()
		.pipe(plumber())
		.pipe(gulpif(path.isProd, vinylStream('main.js')))
		.pipe(gulpif(path.isProd, vinylBuffer()))
		.pipe(gulpif(path.isProd, gulp.dest(path.scripts.dest)))
		.pipe(gulpif(path.isProd, rename({ suffix: '.min' })))
		.pipe(gulpif(path.isProd, uglify()))

		.pipe(gulpif(path.isDev, vinylStream('main.min.js')))
		.pipe(gulpif(path.isDev, vinylBuffer()))
		.pipe(gulpif(path.isDev, sourcemaps.init({ loadMaps: true })))
		.pipe(gulpif(path.isDev, sourcemaps.write()))

		.pipe(gulp.dest(path.scripts.dest));

export const scriptsWatch = () => gulp.watch(path.scripts.watch, scriptsBuild);
