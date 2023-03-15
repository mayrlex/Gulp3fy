import gulp from 'gulp';
import webp from 'gulp-webp';
import imageMin, { mozjpeg, optipng, svgo } from 'gulp-imagemin';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';
import gulpif from 'gulp-if';
import config from '../config.js';
import paths from '../paths.js';

const optimizeImages = () =>
	gulp
		.src(paths.images.src.copy)
		.pipe(
			plumber({
				errorHandler(error) {
					console.error(error.message);
				},
			})
		)

		.pipe(changed(paths.images.dest))
		.pipe(
			gulpif(
				config.isProd,
				imageMin([
					mozjpeg({ quality: 80, progressive: true }),
					optipng({ optimizationLevel: 2 }),
					svgo({}),
				])
			)
		)
		.pipe(gulp.dest(paths.images.dest));

const getImagesWebp = () =>
	gulp
		.src(paths.images.src.webp)
		.pipe(
			plumber({
				errorHandler(error) {
					console.error(error.message);
				},
			})
		)
		.pipe(changed(paths.images.dest, { extension: '.webp' }))
		.pipe(webp())
		.pipe(gulp.dest(paths.images.dest));

export const images = gulp.series(optimizeImages, getImagesWebp);
export const imagesWatch = () => gulp.watch(paths.images.watch, images);
