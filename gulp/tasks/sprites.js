import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import svgSprite from 'gulp-svg-sprite';
import path from '../config/path.js';

export const spriteImagesBuild = () => {
	return gulp
		.src(path.sprites.src.images)
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

		.pipe(gulp.dest(path.sprites.dest));
};

export const spriteIconsBuild = () => {
	return gulp
		.src(path.sprites.src.icons.main)
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
		.pipe(gulp.dest(path.sprites.dest));
};

export const spriteEIconsBuild = () => {
	return gulp
		.src(path.sprites.src.icons.exception)
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

		.pipe(gulp.dest(path.sprites.dest));
};

const spritesBuild = gulp.parallel(spriteImagesBuild, spriteIconsBuild, spriteEIconsBuild);
const spritesWatchPaths = [path.sprites.watch.icons, path.sprites.watch.images];

export const spritesWatch = () => gulp.watch(spritesWatchPaths, spritesBuild);
