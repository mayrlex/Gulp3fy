import gulp from 'gulp';
import webp from 'gulp-webp';
import imageMin, { mozjpeg, optipng, svgo } from 'gulp-imagemin';
import imageMinWebp from 'imagemin-webp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import changed from 'gulp-changed';
import gulpif from 'gulp-if';
import sync from 'browser-sync';
import config from '../config.js';
import paths from '../paths.js';

const imagesCopy = () =>
	gulp
		.src(paths.images.src.copy)
		.pipe(
			plumber(
				notify.onError({
					title: 'IMAGES: COPY',
					message: 'Error: <%= error.message %>',
				})
			)
		)

		.pipe(changed(paths.images.dest))
		.pipe(gulpif(config.isProd, imageMin([mozjpeg({ quality: 80 }), optipng(), svgo({})])))

		.pipe(gulp.dest(paths.images.dest))
		.pipe(sync.stream());

const imagesWebp = () =>
	gulp
		.src(paths.images.src.webp)
		.pipe(
			plumber(
				notify.onError({
					title: 'IMAGES: WEBP',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(changed(paths.images.dest, { extension: '.webp' }))
		.pipe(webp())
		.pipe(
			imageMin({
				plugins: [imageMinWebp({ quality: 80 })],
			})
		)

		.pipe(gulp.dest(paths.images.dest))
		.pipe(sync.stream());

export const imagesBuild = gulp.series(imagesCopy, imagesWebp);
export const imagesWatch = () => gulp.watch(paths.images.watch, imagesBuild);
