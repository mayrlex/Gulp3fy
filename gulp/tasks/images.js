/* eslint-disable import/prefer-default-export */
import gulp from 'gulp';
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import newer from 'gulp-newer';
import gulpif from 'gulp-if';
import sync from 'browser-sync';
import { path } from '../config/path.js';
import { imgminConfig } from '../../config.js';

export const imagesBuild = () => {
	return gulp
		.src(path.images.src)
		.pipe(
			plumber(
				notify.onError({
					title: 'IMAGES',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(newer(path.images.dest))
		.pipe(webp())
		.pipe(gulp.dest(path.images.dest))

		.pipe(gulpif(path.isProd, gulp.src(path.images.src)))
		.pipe(gulpif(path.isProd, newer(path.images.dest)))
		.pipe(
			gulpif(
				path.isProd,
				imagemin({
					progressive: imgminConfig.progressive,
					svgoPlugins: [{ removeViewBox: imgminConfig.svg.removeViewBox }],
					interlaced: imgminConfig.interlaced,
					optimizationLevel: imgminConfig.optimizationLevel,
				})
			)
		)

		.pipe(gulp.dest(path.images.dest))
		.pipe(gulp.src(path.images.svg))
		.pipe(gulp.dest(path.images.dest))
		.pipe(sync.stream());
};

export const imagesWatch = () => gulp.watch(path.images.watch, imagesBuild);
