import gulp from 'gulp';
import plumber from 'gulp-plumber';
import svgSprite from 'gulp-svg-sprite';
import paths from '../paths.js';

export const imagesSprite = () =>
	gulp
		.src(paths.sprites.images)
		.pipe(
			plumber({
				errorHandler(error) {
					console.error(error.message);
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

		.pipe(gulp.dest(paths.sprites.dest));

export const iconsMonoSprite = () =>
	gulp
		.src(paths.sprites.iconsMono)
		.pipe(
			plumber({
				errorHandler(error) {
					console.error(error.message);
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
		.pipe(gulp.dest(paths.sprites.dest));

export const iconsMultiSprite = () =>
	gulp
		.src(paths.sprites.iconsMulti)
		.pipe(
			plumber({
				errorHandler(error) {
					console.error(error.message);
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

		.pipe(gulp.dest(paths.sprites.dest));

export const sprites = gulp.parallel(imagesSprite, iconsMonoSprite, iconsMultiSprite);
export const imagesSpriteWatch = () => gulp.watch(paths.sprites.images, imagesSprite);
export const iconsMonoSpriteWatch = () => gulp.watch(paths.sprites.iconsMono, iconsMonoSprite);
export const iconsMultiSpriteWatch = () => gulp.watch(paths.sprites.iconsMulti, iconsMultiSprite);
