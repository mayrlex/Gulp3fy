import gulp from 'gulp';
import changed from 'gulp-changed';
import imgMin from 'gulp-imagemin';
import imgMinPng from 'imagemin-pngquant';
import imgMinWebp from 'imagemin-webp';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import path from '../config.js';

const copyImages = () =>
	gulp
		.src(path.images.src)
		.pipe(changed(path.images.src))
		.pipe(
			gulpif(
				path.isProd,
				imgMin([
					imgMin.mozjpeg({
						quality: 80,
					}),
					imgMinPng({
						quality: [0.8, 0.9],
					}),
					imgMin.svgo(
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
			imgMin([
				imgMinWebp({
					quality: 80,
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
