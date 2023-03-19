import gulp from 'gulp';
import plumber from 'gulp-plumber';
import svgSprite from 'gulp-svg-sprite';
import paths from '../paths.js';

const imagesSprite = () =>
	gulp
		.src(paths.sprites.images)
		.pipe(
			plumber({
				errorHandler(error) {
					console.error(error.message);
					this.emit('end');
				},
			})
		)
		.pipe(
			svgSprite({
				mode: {
					stack: {
						sprite: '../images.svg',
						example: true,
					},
				},
				shape: {
					transform: [
						{
							svgo: {
								plugins: [
									{ removeAttrs: { attrs: ['class', 'data-name'] } },
									{ removeUselessStrokeAndFill: false },
									{ inlineStyles: true },
								],
							},
						},
					],
				},
			})
		)
		.pipe(gulp.dest(paths.sprites.output));

const iconsMonoSprite = () =>
	gulp
		.src(paths.sprites.iconsMono)
		.pipe(
			plumber({
				errorHandler(error) {
					console.error(error.message);
					this.emit('end');
				},
			})
		)
		.pipe(
			svgSprite({
				mode: { stack: { sprite: '../icons-mono.svg', example: true } },
				shape: {
					transform: [
						{
							svgo: {
								plugins: [
									{
										removeAttrs: {
											attrs: ['class', 'data-name', 'fill.*', 'stroke.*'],
										},
									},
								],
							},
						},
					],
				},
			})
		)
		.pipe(gulp.dest(paths.sprites.output));

const iconsMultiSprite = () =>
	gulp
		.src(paths.sprites.iconsMulti)
		.pipe(
			plumber({
				errorHandler(error) {
					console.error(error.message);
					this.emit('end');
				},
			})
		)
		.pipe(
			svgSprite({
				mode: {
					stack: {
						sprite: '../icons-multi.svg',
						example: true,
					},
				},
				shape: {
					transform: [
						{
							svgo: {
								plugins: [
									{
										removeAttrs: {
											attrs: ['class', 'data-name'],
										},
									},
									{ removeUselessStrokeAndFill: false },
									{ inlineStyles: true },
								],
							},
						},
					],
				},
			})
		)
		.pipe(gulp.dest(paths.sprites.output));

const sprites = gulp.parallel(imagesSprite, iconsMonoSprite, iconsMultiSprite);

export default sprites;
export { imagesSprite };
export { iconsMonoSprite };
export { iconsMultiSprite };
