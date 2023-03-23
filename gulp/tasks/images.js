import gulp from 'gulp';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';
import gulpif from 'gulp-if';
import imageMin, { mozjpeg, optipng, svgo } from 'gulp-imagemin';
import webp from 'gulp-webp';
import config from '../config.js';
import paths from '../paths.js';

const optimizeImages = () =>
	gulp
		.src(`${paths.images.input}/${paths.images.pattern.default}`)
		.pipe(
			plumber({
				errorHandler(error) {
					console.error(error.message);
					this.emit('end');
				},
			})
		)
		.pipe(changed(paths.images.output))
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
		.pipe(gulp.dest(paths.images.output));

const convertImagesToWebp = () =>
	gulp
		.src(`${paths.images.input}/${paths.images.pattern.webp}`)
		.pipe(
			plumber({
				errorHandler(error) {
					console.error(error.message);
				},
			})
		)
		.pipe(changed(paths.images.output, { extension: '.webp' }))
		.pipe(webp())
		.pipe(gulp.dest(paths.images.output));

const images = gulp.series(optimizeImages, convertImagesToWebp);

export default images;
export { optimizeImages };
export { convertImagesToWebp };
