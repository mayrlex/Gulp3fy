import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import svgSprite from 'gulp-svg-sprite';
import paths from '../config/paths.js';

export const spriteImagesBuild = () =>
	gulp
		.src(paths.sprites.src.images)
		.pipe(
			plumber(
				notify.onError({
					title: 'IMAGES SPRITES',
					message: 'Error: <%= error.message %>',
				})
			)
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

export const spriteIconsBuild = () =>
	gulp
		.src(paths.sprites.src.icons.main)
		.pipe(
			plumber(
				notify.onError({
					title: 'ICON SPRITES',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(
			svgSprite({
				mode: { stack: { sprite: '../icons.svg', example: true } },
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

export const spriteEIconsBuild = () =>
	gulp
		.src(paths.sprites.src.icons.exception)
		.pipe(
			plumber(
				notify.onError({
					title: 'EICONS SPRITES',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(
			svgSprite({
				mode: {
					stack: {
						sprite: '../eIcons.svg',
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

const spritesBuild = gulp.parallel(spriteImagesBuild, spriteIconsBuild, spriteEIconsBuild);
const spritesWatchPaths = [paths.sprites.watch.icons, paths.sprites.watch.images];

export const spritesWatch = () => gulp.watch(spritesWatchPaths, spritesBuild);
