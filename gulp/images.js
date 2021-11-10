import gulp from 'gulp';
import changed from 'gulp-changed';
import imageMin, { mozjpeg, svgo } from 'gulp-imagemin';
import imageMinPng from 'imagemin-pngquant';
import imageMinWebp from 'imagemin-webp';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import { path, quality } from '../config.js';

const copyImages = () =>
	gulp
		.src(path.images.src)
		.pipe(changed(path.images.src))
		.pipe(
			gulpif(
				path.isProd,
				imageMin([
					mozjpeg({
						quality: quality.jpeg,
					}),
					imageMinPng({
						quality: quality.png,
					}),
					svgo(
						{ removeComments: true },
						{ removeEmptyAttrs: true },
						{ removeEmptyText: true },
						{ collapseGroups: true }
					),
				])
			)
		)
		.pipe(gulp.dest(path.images.dest));

const convertImagesToWebp = () =>
	gulp
		.src(path.images.webp)
		.pipe(changed(path.images.dest, { extension: '.webp' }))
		.pipe(
			imageMin([
				imageMinWebp({
					quality: quality.webp,
				}),
			])
		)
		.pipe(
			rename({
				extname: '.webp',
			})
		)
		.pipe(gulp.dest(path.images.dest));

export const imagesBuild = gulp.series(copyImages, convertImagesToWebp);

export const imagesWatch = () => gulp.watch(path.images.watch, imagesBuild);
